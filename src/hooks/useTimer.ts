import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';

export function useTimer() {
  const isPlaying = useGameStore((state) => state.isPlaying);
  const isCompleted = useGameStore((state) => state.isCompleted);
  const updateElapsedTime = useGameStore((state) => state.updateElapsedTime);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying && !isCompleted) {
      intervalRef.current = setInterval(() => {
        updateElapsedTime();
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, isCompleted, updateElapsedTime]);
}
