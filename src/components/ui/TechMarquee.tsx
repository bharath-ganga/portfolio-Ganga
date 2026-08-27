export function TechMarquee() {
  const techs = ['Java', 'Python', 'React', 'Node.js', 'TypeScript', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'Fastify', 'MediaPipe', 'OpenCV'];
  return (
    <div className="overflow-hidden">
      <div className="marquee-content whitespace-nowrap">
        {[...techs, ...techs].map((tech, i) => (
          <span key={tech + i}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
