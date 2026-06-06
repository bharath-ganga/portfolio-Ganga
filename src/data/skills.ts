import type { SkillCategory, ToolItem } from './types';

export const technicalSkills: SkillCategory[] = [
  { title: 'Languages', skills: [{name: 'TypeScript', icon: 'typescript/typescript-original.svg'}, {name: 'JavaScript', icon: 'javascript/javascript-original.svg'}, {name: 'Java', icon: 'java/java-original.svg'}, {name: 'Python', icon: 'python/python-original.svg'}] },
  { title: 'Frontend', skills: [{name: 'React', icon: 'react/react-original.svg'}, {name: 'Next.js', icon: 'nextjs/nextjs-original.svg'}, {name: 'Expo', icon: null}, {name: 'Tailwind CSS', icon: 'tailwindcss/tailwindcss-original.svg'}] },
  { title: 'Backend', skills: [{name: 'Node.js', icon: 'nodejs/nodejs-original.svg'}, {name: 'Bun.js', icon: 'bun/bun-original.svg'}, {name: 'Fastify', icon: 'fastify/fastify-plain.svg'}, {name: 'Express', icon: 'express/express-original.svg'}, {name: 'Flask', icon: 'flask/flask-original.svg'}] },
  { title: 'Databases', skills: [{name: 'MongoDB', icon: 'mongodb/mongodb-original.svg'}, {name: 'PostgreSQL', icon: 'postgresql/postgresql-original.svg'}, {name: 'MySQL', icon: 'mysql/mysql-original.svg'}, {name: 'Redis', icon: 'redis/redis-original.svg'}] },
  { title: 'Tools & Cloud', skills: [{name: 'Git', icon: 'git/git-original.svg'}, {name: 'Docker', icon: 'docker/docker-original.svg'}, {name: 'Kubernetes', icon: 'kubernetes/kubernetes-plain.svg'}, {name: 'AWS', icon: 'amazonwebservices/amazonwebservices-original-wordmark.svg'}, {name: 'Vercel', icon: null}, {name: 'Oracle OCI', icon: null}] },
  { title: 'Currently Learning', skills: [{name: 'Machine Learning', icon: null}] }
];

export const digitalToolkit: ToolItem[] = [
  { name: 'React.js', icon: '⚛️' },
  { name: 'Tailwind', icon: '🌊' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'VS Code', icon: '💻' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Docker', icon: '🐋' },
  { name: 'Linux', icon: '🐧' },
  { name: 'Postman', icon: '🚀' }
];

export const hobbies: ToolItem[] = [
  { name: 'Ethical Hacking', icon: '🕵️‍♂️' },
  { name: 'Web Architecture', icon: '🏗️' },
  { name: 'UI/UX Design', icon: '✨' },
  { name: 'Open Source', icon: '🌍' },
  { name: 'Problem Solving', icon: '🧩' }
];
