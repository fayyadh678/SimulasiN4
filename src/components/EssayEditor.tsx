interface Props {
  value: string;
  maxCharacters: number;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function EssayEditor({ value, maxCharacters, onChange, disabled }: Props) {
  return (
    <div className="essay-editor">
      <p className="small muted">
        Tulis jawaban dalam bahasa Jepang (2–3 kalimat). Jawaban esai dinilai manual setelah ujian dikumpulkan.
      </p>
      <label className="sr-only" htmlFor="essay-input">
        Jawaban esai
      </label>
      <textarea
        id="essay-input"
        lang="ja"
        value={value}
        maxLength={maxCharacters}
        placeholder="Tulis 2–3 kalimat dalam bahasa Jepang"
        onChange={(event) => onChange(event.target.value.slice(0, maxCharacters))}
        disabled={disabled}
      />
      <div className="counter">
        {value.length}/{maxCharacters} karakter
      </div>
    </div>
  );
}