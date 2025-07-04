
import React, { useState, useEffect } from 'react';

interface TimerDisplayProps {
  startTime: Date | null;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ startTime }) => {
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    if (!startTime) return;

    const intervalId = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();

      const hours = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const minutes = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const seconds = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');

      setElapsedTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  return (
    <div className="font-mono text-6xl font-bold text-white bg-slate-900/50 rounded-lg py-4">
      {elapsedTime}
    </div>
  );
};
