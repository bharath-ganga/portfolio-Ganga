import { useState, useEffect } from 'react';

export function TypewriterName({ text = "Ganga Bharath" }: { text?: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span className="inline-flex items-center justify-center">
      <span className="text-gradient">{displayedText}</span>
    </span>
  );
}
