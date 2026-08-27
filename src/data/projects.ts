import type { Project } from './types';

export const projects: Project[] = [
  {
    title: 'WearYourStyle',
    description: 'An AI-Powered Fashion Marketplace featuring real-time virtual try-on. Used MediaPipe and OpenCV to overlay garments on user pose data with high precision.',
    image: '/projects-wear.png',
    skills: ['React', 'Node.js', 'Python', 'OpenCV', 'MediaPipe'],
    github: 'https://github.com/bharath-ganga/WearYourStyle-new',
    demo: 'https://wear-your-style.vercel.app',
    details: [
      'Real-time virtual try-on capability using OpenCV and MediaPipe',
      'Full-stack architecture with React frontend and Node.js backend',
      'High precision pose detection for accurate garment mapping',
      'Integrated secure payment and user authentication'
    ],
    featured: true
  },
  {
    title: 'Smart Resume Screener',
    description: 'An AI-powered hiring platform that parses resumes in bulk, evaluates candidates against job descriptions, and produces ranked, explainable shortlists using Google Gemini.',
    image: '/projects-resume-screener-real.png',
    skills: ['React', 'TypeScript', 'FastAPI', 'Python', 'Google Gemini', 'SQLite'],
    github: 'https://github.com/bharath-ganga/Smart-Resume-Screener',
    demo: 'https://frontend-alpha-eight-95.vercel.app/',
    details: [
      'Bulk PDF and TXT resume upload with structured candidate extraction',
      'Gemini-powered 1–10 match scoring with strengths, gaps, and recommendations',
      'Configurable auto-shortlisting and a sortable ranked candidate dashboard',
      'Persistent candidate and screening data with one-click CSV export'
    ],
    featured: true
  },
  {
    title: 'Expense Tracker',
    description: 'A full-stack finance tracking app with automated categorization and insightful dashboard visualizations.',
    image: '/projects-expense.png',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Chart.js'],
    github: 'https://github.com/bharath-ganga/expensivetracker_intern.git',
    demo: 'https://expensivetracker-teal.vercel.app/',
    details: [
      'Interactive dashboard with spending visualizations',
      'Automated expense categorization',
      'REST API built with Node.js and Express',
      'Secure data storage with MongoDB'
    ],
    featured: false
  }
];
