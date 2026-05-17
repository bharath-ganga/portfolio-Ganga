import { useState, useEffect } from 'react';

export function RoleSwitcher() {
  const roles = ['Full-Stack Developer', 'AI Solutions Architect', 'Cybersecurity Enthusiast', 'Problem Solver'];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className={`transition-all duration-500 inline-block ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {roles[index]}
    </span>
  );
}
