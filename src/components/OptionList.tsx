import type { Choice, Question } from '../lib/types';

const KEYS: Choice[] = ['A', 'B', 'C', 'D'];

interface Props {
  question: Question;
  selected?: string;
  onSelect: (value: Choice) => void;
  disabled?: boolean;
  reveal?: {
    answer: Choice;
    chosen?: Choice;
  };
}

export function OptionList({ question, selected, onSelect, disabled, reveal }: Props) {
  const options = question.options;
  if (!options) return null;

  return (
    <ul className="option-list" role="radiogroup" aria-label={`Pilihan jawaban soal ${question.number}`}>
      {KEYS.map((key) => {
        const isChosen = selected === key;
        let className = 'option';
        if (reveal) {
          if (reveal.answer === key) className += ' correct';
          else if (reveal.chosen === key) className += ' selected-wrong';
        }
        return (
          <li key={key}>
            <button
              type="button"
              role="radio"
              aria-checked={isChosen}
              className={className}
              onClick={() => onSelect(key)}
              disabled={disabled}
            >
              <span className="key" aria-hidden="true">
                {key}
              </span>
              <span className="ja">{options[key]}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function answerText(question: Question, value: string | undefined): string {
  if (!value) return '—';
  if (question.kind === 'essay') return value;
  return `${value}. ${question.options?.[value as Choice] ?? ''}`;
}