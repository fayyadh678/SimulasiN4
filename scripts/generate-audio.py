"""Generate the 50 Japanese listening MP3 files.

Pipeline per question:
  1. Split the transcript into 女：/男： turns.
  2. Synthesise each turn: female voice via Google Translate TTS, male voice via Piper
     (neural ja_JP-hi_fi_captain). Both are bundled offline into public/audio, so the
     deployed site never calls a paid API at exam time.
  3. Insert 400-700 ms of silence between turns.
  4. Loudness-normalise and encode to 48 kbit/s mono MP3 with ffmpeg.

Usage: python scripts/generate-audio.py [--only set-1] [--keep-temp]
"""

from __future__ import annotations

import argparse
import json
import os
import random
import shutil
import struct
import subprocess
import sys
import time
import urllib.parse
import urllib.request
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src" / "data" / "simulations.json"
PUBLIC = ROOT / "public"
TEMP = ROOT / "tmp" / "audio-build"
FFMPEG = ROOT / "node_modules" / "ffmpeg-static" / "ffmpeg.exe"
MODEL = ROOT / "tools" / "voices" / "ja.onnx"

SAMPLE_RATE = 24000
MIN_DURATION_MS = 1200

_voice = None


def piper_voice():
    global _voice
    if _voice is None:
        from piper import PiperVoice

        _voice = PiperVoice.load(str(MODEL), str(MODEL) + ".json")
    return _voice


def synth_piper(text: str, out_wav: Path) -> None:
    voice = piper_voice()
    with wave.open(str(out_wav), "wb") as handle:
        voice.synthesize_wav(text, handle, syn_config=None)


def synth_google(text: str, out_mp3: Path) -> None:
    query = urllib.parse.urlencode({"ie": "UTF-8", "client": "gtx", "tl": "ja", "q": text})
    url = f"https://translate.googleapis.com/translate_tts?{query}"
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/124.0 Safari/537.36",
            "Referer": "https://translate.google.com/",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = response.read()
    if len(payload) < 1500:
        raise RuntimeError(f"Google TTS mengembalikan {len(payload)} byte")
    out_mp3.write_bytes(payload)


def decode_to_wav(source: Path, out_wav: Path) -> None:
    subprocess.run(
        [
            str(FFMPEG),
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(source),
            "-af",
            "loudnorm=I=-18:TP=-2:LRA=9",
            "-ac",
            "1",
            "-ar",
            str(SAMPLE_RATE),
            "-sample_fmt",
            "s16",
            str(out_wav),
        ],
        check=True,
    )


def read_frames(path: Path) -> bytes:
    with wave.open(str(path), "rb") as handle:
        if handle.getframerate() != SAMPLE_RATE or handle.getnchannels() != 1:
            raise RuntimeError(f"Format tidak sesuai: {path}")
        return handle.readframes(handle.getnframes())


def silence(ms: int, amplitude: int = 0) -> bytes:
    frames = int(SAMPLE_RATE * ms / 1000)
    return struct.pack("<h", amplitude) * frames


def write_wav(path: Path, frames: bytes) -> None:
    with wave.open(str(path), "wb") as handle:
        handle.setnchannels(1)
        handle.setsampwidth(2)
        handle.setframerate(SAMPLE_RATE)
        handle.writeframes(frames)


def encode_mp3(wav_path: Path, mp3_path: Path) -> None:
    mp3_path.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            str(FFMPEG),
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(wav_path),
            "-af",
            "loudnorm=I=-16:TP=-1.5:LRA=11,highpass=f=80",
            "-ac",
            "1",
            "-ar",
            "24000",
            "-codec:a",
            "libmp3lame",
            "-b:a",
            "48k",
            "-write_xing",
            "1",
            str(mp3_path),
        ],
        check=True,
    )


def duration_ms(path: Path) -> int:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path), "-f", "null", "-"],
        capture_output=True,
        text=True,
    )
    for token in result.stderr.replace(",", " ").split():
        if token.startswith("Duration:"):
            continue
    marker = "Duration: "
    index = result.stderr.find(marker)
    if index < 0:
        raise RuntimeError(f"Tidak bisa membaca durasi {path}")
    value = result.stderr[index + len(marker) : index + len(marker) + 11]
    hours, minutes, seconds = value.split(":")
    return int((int(hours) * 3600 + int(minutes) * 60 + float(seconds)) * 1000)


def split_turns(transcript: str) -> list[tuple[str, str]]:
    turns: list[tuple[str, str]] = []
    for raw in transcript.split("\n"):
        line = raw.strip()
        if not line:
            continue
        for speaker in ("女", "男"):
            if line.startswith(f"{speaker}："):
                text = line[len(speaker) + 1 :].strip()
                if text:
                    turns.append((speaker, text))
                break
        else:
            if turns:
                speaker, previous = turns[-1]
                turns[-1] = (speaker, f"{previous}{line}")
    return turns


def build_question(question: dict, index: int, total: int) -> dict:
    qid = question["id"]
    turns = split_turns(question.get("transcript", ""))
    if len(turns) < 2:
        raise RuntimeError(f"{qid}: transcript butuh minimal dua giliran")

    work = TEMP / qid
    work.mkdir(parents=True, exist_ok=True)
    pieces: list[bytes] = []

    for turn_index, (speaker, text) in enumerate(turns):
        if turn_index > 0:
            pieces.append(silence(random.randint(400, 700)))
        if speaker == "女":
            mp3 = work / f"t{turn_index}.mp3"
            wav = work / f"t{turn_index}.wav"
            for attempt in range(4):
                try:
                    synth_google(text, mp3)
                    break
                except Exception as error:  # noqa: BLE001 - network retry
                    if attempt == 3:
                        raise RuntimeError(f"{qid}: Google TTS gagal ({error})") from error
                    time.sleep(1.5 * (attempt + 1))
            decode_to_wav(mp3, wav)
            pieces.append(read_frames(wav))
        else:
            wav = work / f"t{turn_index}.wav"
            synth_piper(text, wav)
            decode_to_wav(wav, work / f"t{turn_index}-n.wav")
            pieces.append(read_frames(work / f"t{turn_index}-n.wav"))

    combined = work / "combined.wav"
    write_wav(combined, silence(180) + b"".join(pieces) + silence(320))

    target = PUBLIC / question["audio_src"]
    encode_mp3(combined, target)
    ms = duration_ms(target)
    if ms < MIN_DURATION_MS:
        raise RuntimeError(f"{qid}: durasi {ms} ms terlalu pendek")
    shutil.rmtree(work, ignore_errors=True)
    print(f"[{index}/{total}] {question['audio_src']} · {ms} ms · {target.stat().st_size // 1024} KB")
    return {"id": qid, "durationMs": ms, "bytes": target.stat().st_size}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", help="Batasi ke satu folder set, mis. set-1")
    parser.add_argument("--keep-temp", action="store_true")
    args = parser.parse_args()

    if not FFMPEG.exists():
        print(f"ffmpeg tidak ditemukan: {FFMPEG}", file=sys.stderr)
        return 1
    if not MODEL.exists():
        print(f"Model Piper tidak ditemukan: {MODEL}", file=sys.stderr)
        return 1

    data = json.loads(DATA.read_text(encoding="utf-8"))
    listening = [
        question
        for simulation in data
        for question in simulation["questions"]
        if question["category"] == "listening"
    ]
    if args.only:
        listening = [q for q in listening if f"/{args.only}/" in f"/{q['audio_src']}/"]

    TEMP.mkdir(parents=True, exist_ok=True)
    report = []
    failures = []
    for index, question in enumerate(listening, start=1):
        try:
            report.append(build_question(question, index, len(listening)))
        except Exception as error:  # noqa: BLE001 - report and continue
            failures.append(f"{question['id']}: {error}")
            print(f"[{index}/{len(listening)}] GAGAL {question['id']}: {error}", file=sys.stderr)

    if not args.keep_temp:
        shutil.rmtree(TEMP, ignore_errors=True)

    print(f"\nBerhasil: {len(report)}/{len(listening)}")
    if failures:
        print("Gagal:")
        for failure in failures:
            print(f" - {failure}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())