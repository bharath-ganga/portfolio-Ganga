export function TechMarquee() {
  const techs = ['Java', 'Python', 'React', 'Node.js', 'TypeScript', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'Fastify', 'MediaPipe', 'OpenCV'];
  return (
    <div className="overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ash-50 dark:from-ash-950 to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ash-50 dark:from-ash-950 to-transparent z-10"></div>
      <div className="marquee-content whitespace-nowrap py-2">
        {[...techs, ...techs].map((tech, i) => (
          <span key={tech + i} className="text-lg font-mono text-ash-400 dark:text-ash-600 px-4 select-none">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
