import { useEffect, useState } from 'react';
import { formatDuration } from '../lib/format';

interface Props {
  deadlineAt: number | null;
  active: boolean;
  onExpire: () => void;
}

export function ExamTimer({ deadlineAt, active, onExpire }: Props) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!active || deadlineAt === null) return;
    setNow(Date.now());
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [active, deadlineAt]);

  useEffect(() => {
    if (!active || deadlineAt === null) return;
    if (now >= deadlineAt) onExpire();
  }, [now, deadlineAt, active, onExpire]);

  const remaining = deadlineAt === null ? 0 : Math.max(0, deadlineAt - now);
  const low = remaining <= 5 * 60 * 1000;

  return (
    <span className={`timer${low ? ' low' : ''}`} aria-live="off">
      <span className="sr-only">Sisa waktu</span>
      {formatDuration(remaining)}
    </span>
  );
}