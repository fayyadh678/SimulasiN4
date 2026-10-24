import { useCallback, useEffect, useState } from 'react';
import type { Session } from '../lib/types';
import { readSession } from '../lib/sessionStore';

export function useSetSession(setId: string | undefined): {
  session: Session | null;
  refresh: () => void;
  apply: (next: Session) => void;
} {
  const [session, setSession] = useState<Session | null>(null);

  const refresh = useCallback(() => {
    if (!setId) {
      setSession(null);
      return;
    }
    setSession(readSession(setId));
  }, [setId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const apply = useCallback((next: Session) => {
    setSession(next);
  }, []);

  return { session, refresh, apply };
}