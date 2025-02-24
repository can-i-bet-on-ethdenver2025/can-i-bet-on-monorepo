'use client';

import { useEffect, useState } from 'react';

export interface CountdownTimerProps {
  betsCloseAt: number;
  className?: string;
}

export const CountdownTimer = ({ betsCloseAt, className = '' }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = betsCloseAt - now;

      if (diff <= 0) {
        return 'Betting closed';
      }

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [betsCloseAt]);

  return (
    <div className={`text-xl font-medium ${className}`}>
      {timeLeft} {timeLeft !== 'Betting closed' && 'left before bets close'}
    </div>
  );
}; 