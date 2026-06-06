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
  },
  {
    title: 'SDN DDoS Detection',
    description: 'Research-based ML model for detecting network attacks in software-defined network architectures.',
    image: '/projects-cyber.png',
    skills: ['Python', 'Machine Learning', 'SDN', 'Networking', 'Scikit-learn'],
    github: 'https://github.com/bharath-ganga/ML-Based-SDN-DDoS-Detection',
    demo: null,
    details: [
      'Implemented multiple ML classifiers for network traffic analysis',
      'Designed to work within Software-Defined Networking controllers',
      'High accuracy in distinguishing legitimate traffic from DDoS floods',
      'Comprehensive research on network security architectures'
    ],
    featured: false
  }
];
