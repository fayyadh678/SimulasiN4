import type { Question, Session } from '../lib/types';

interface Props {
  questions: Question[];
  session: Session;
  currentIndex: number;
  onJump: (index: number) => void;
}

export function QuestionNav({ questions, session, currentIndex, onJump }: Props) {
  return (
    <nav className="nav-grid" aria-label="Daftar soal">
      {questions.map((question, index) => {
        const answered = (session.answers[question.id] ?? '').trim().length > 0;
        const classes = [
          'nav-cell',
          answered ? 'answered' : '',
          index === currentIndex ? 'current' : '',
          question.kind === 'essay' ? 'essay' : '',
        ]
          .filter(Boolean)
          .join(' ');
        return (
          <button
            key={question.id}
            type="button"
            className={classes}
            aria-current={index === currentIndex ? 'true' : undefined}
            aria-label={`Soal ${question.number}${answered ? ', sudah dijawab' : ', belum dijawab'}`}
            onClick={() => onJump(index)}
          >
            {question.number}
          </button>
        );
      })}
    </nav>
  );
}