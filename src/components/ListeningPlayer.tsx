import { useEffect, useRef, useState } from 'react';
import { publicAsset } from '../lib/publicAsset';

interface Props {
  src: string;
  maxPlays: number;
  used: number;
  onPlay: () => void;
}

export function ListeningPlayer({ src, maxPlays, used, onPlay }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const exhausted = used >= maxPlays;

  useEffect(() => {
    setError(null);
    setPlaying(false);
  }, [src]);

  const handlePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (exhausted) return;
    try {
      audio.currentTime = 0;
      await audio.play();
      onPlay();
    } catch {
      setError('Audio gagal diputar. Coba tekan ulang tombol putar atau muat ulang halaman.');
    }
  };

  const handleStop = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  return (
    <div className="audio-box">
      <div className="btn-row">
        <button
          type="button"
          className="btn primary"
          onClick={playing ? handleStop : handlePlay}
          disabled={!playing && exhausted}
        >
          {playing ? '⏸ Hentikan' : '▶ Putar audio'}
        </button>
        <span className="plays">
          Diputar {used}/{maxPlays}× {exhausted && !playing ? '• batas tercapai' : ''}
        </span>
      </div>
      <p className="small muted" style={{ marginTop: '0.6rem', marginBottom: 0 }}>
        Transcript baru tersedia di halaman review setelah ujian selesai.
      </p>
      {error && (
        <div className="notice danger" role="alert" style={{ marginTop: '0.75rem' }}>
          {error}{' '}
          <button
            type="button"
            className="btn small"
            onClick={() => {
              setError(null);
              void handlePlay();
            }}
          >
            Coba lagi
          </button>
        </div>
      )}
      <audio
        ref={audioRef}
        src={publicAsset(src)}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setError('Audio tidak dapat dimuat. Periksa koneksi lalu muat ulang halaman.')}
      >
        <track kind="captions" />
      </audio>
    </div>
  );
}