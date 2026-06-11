import { useEffect, useRef } from 'react';

const INACTIVITY_MS = 2 * 60 * 1000;

const ACTIVITY_EVENTS = ['pointerdown', 'touchstart', 'keydown', 'click'] as const;

export function useInactivityReset(onReset: () => void) {
  const onResetRef = useRef(onReset);
  onResetRef.current = onReset;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => onResetRef.current(), INACTIVITY_MS);
    };

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, resetTimer, { passive: true });
    }

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, resetTimer);
      }
    };
  }, []);
}
