import type { Project } from './types';

export const projects: Project[] = [
  {
    title: 'WearYourStyle',
    description: 'An AI-Powered Fashion Marketplace featuring real-time virtual try-on. Used MediaPipe and OpenCV to overlay garments on user pose data with high precision.',
    image: '/projects-wear.png',
    skills: ['React', 'Node.js', 'Python', 'OpenCV', 'MediaPipe'],
    problem: 'Online fashion shoppers often cannot tell how a garment will look on them before purchasing, creating uncertainty and avoidable returns.',
    solution: 'Built an end-to-end marketplace with a browser-based virtual try-on experience powered by pose landmarks and real-time garment overlays.',
    outcome: 'Delivered a working commerce prototype that connects product discovery, secure user flows, payments, and computer vision in one experience.',
    architecture: ['React marketplace and try-on interface', 'Node.js application and commerce services', 'Python computer-vision pipeline', 'MediaPipe pose landmarks with OpenCV overlays'],
    metrics: [{ value: 'Live', label: 'Pose-based try-on' }, { value: 'End-to-end', label: 'Commerce prototype' }],
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
    image: '/projects-resume-screener-clean.png',
    skills: ['React', 'TypeScript', 'FastAPI', 'Python', 'Google Gemini', 'SQLite'],
    problem: 'Reviewing large batches of resumes manually is slow, inconsistent, and makes it difficult to explain why one candidate ranks above another.',
    solution: 'Created a full-stack screening workflow that extracts structured candidate data, compares it with a job description, and returns ranked recommendations.',
    outcome: 'Produced an explainable hiring dashboard with configurable shortlisting, persistent screening history, and exportable results.',
    architecture: ['React and TypeScript dashboard', 'FastAPI service and typed API layer', 'Gemini 1.5 Flash extraction and evaluation', 'SQLite persistence with PDF/TXT parsing'],
    metrics: [{ value: '11', label: 'Resume benchmark' }, { value: '1–10', label: 'Explainable fit score' }, { value: '≥ 6', label: 'Default shortlist' }],
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
    problem: 'Everyday spending is difficult to understand when transactions are scattered and categories must be maintained manually.',
    solution: 'Built a focused finance dashboard that records expenses, organizes transactions, and turns spending data into useful visual summaries.',
    outcome: 'Delivered a deployed full-stack application with persistent transaction data, automated categorization, and interactive reporting.',
    architecture: ['React dashboard and transaction flows', 'Node.js and Express REST API', 'MongoDB document persistence', 'Chart.js spending visualizations'],
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
