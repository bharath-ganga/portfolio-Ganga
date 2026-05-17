import { useState, useEffect } from 'react';

export function CurrentTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'pm' : 'am';
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden lg:flex items-center gap-3 bg-white/50 dark:bg-ash-900/50 backdrop-blur-md px-5 py-3 rounded-2xl border border-ash-200/50 dark:border-ash-700/50 shadow-xl transition-all duration-500 hover:scale-105 hover:bg-white/70 dark:hover:bg-ash-800/70">
      <div className="text-4xl font-bold tracking-tight text-ash-900 dark:text-ash-100">
        {hours}:{minutes}
      </div>
      <div className="flex flex-col justify-center text-xs font-semibold text-ash-600 dark:text-ash-400">
        <span className="uppercase">{ampm}</span>
        <span>{month} {day}</span>
      </div>
    </div>
  );
}
