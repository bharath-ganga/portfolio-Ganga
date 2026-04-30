import { useState, useEffect, useRef } from 'react'

function App() {
  const [formStatus, setFormStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Custom Cursor Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a') || target.closest('button')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Scroll Reveal Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal-hidden').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formsubmit.co/ajax/bharathganga7@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
      })

      if (response.ok) {
        setFormStatus('success')
        form.reset()
      } else {
        setFormStatus('error')
      }
    } catch (error) {
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
      // Reset status after 5 seconds
      setTimeout(() => setFormStatus(''), 5000)
    }
  }

  return (
    <div className="min-h-screen transition-colors duration-500">
      {/* Background blobs */}
      <div className="interactive-bg">
        <div className="blob bg-purple-300 dark:bg-purple-900 top-0 -left-4 animate-blob"></div>
        <div className="blob bg-yellow-300 dark:bg-yellow-900 top-0 -right-4 animate-blob [animation-delay:2s]"></div>
        <div className="blob bg-pink-300 dark:bg-pink-900 -bottom-8 left-20 animate-blob [animation-delay:4s]"></div>
      </div>

      {/* Custom Cursor */}
      <div
        className="custom-cursor hidden md:block"
        style={{ left: cursorPos.x, top: cursorPos.y, transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})` }}
      ></div>
      <div
        className="custom-cursor-dot hidden md:block"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      ></div>

      {/* Floating Time Display */}
      <CurrentTime />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 pt-4">
        <div className="flex justify-center px-4">
          <div className="nav-blur border rounded-full shadow-lg max-w-4xl w-full">
            <div className="flex items-center justify-center h-14 px-6 relative">
              {/* Navigation Links - Left */}
              <div className="hidden md:flex space-x-6 absolute left-6">
                <a href="#about" className="text-ash-600 dark:text-ash-400 hover:text-ash-900 dark:hover:text-ash-100 transition-colors duration-200 font-medium text-sm">
                  About
                </a>
                <a href="#projects" className="text-ash-600 dark:text-ash-400 hover:text-ash-900 dark:hover:text-ash-100 transition-colors duration-200 font-medium text-sm">
                  Projects
                </a>
              </div>

              {/* Centered Name */}
              <div className="text-lg font-bold text-ash-900 dark:text-ash-100">
                Ganga Bharath
              </div>

              {/* Navigation Links - Right (desktop only) */}
              <div className="hidden md:flex items-center space-x-6 absolute right-6">
                <a href="#skills" className="text-ash-400 hover:text-ash-100 transition-colors duration-200 font-medium text-sm">
                  Skills
                </a>
                <a href="#contact" className="text-ash-400 hover:text-ash-100 transition-colors duration-200 font-medium text-sm">
                  Contact
                </a>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-1.5 rounded-full hover:bg-ash-200/20 dark:hover:bg-ash-800 transition-colors text-ash-600 dark:text-ash-400"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? '🌞' : '🌙'}
                </button>
              </div>

              {/* Mobile right controls */}
              <div className="md:hidden flex items-center gap-2 absolute right-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full hover:bg-ash-200/20 dark:hover:bg-ash-800 transition-colors text-ash-600 dark:text-ash-400"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? '🌞' : '🌙'}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-full hover:bg-ash-800 transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <svg className="w-5 h-5 text-ash-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-ash-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mx-4 mt-2 nav-blur border rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col py-2">
              {['about', 'projects', 'skills', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-4 text-ash-700 dark:text-ash-300 hover:text-ash-900 dark:hover:text-ash-100 hover:bg-ash-100/50 dark:hover:bg-ash-800/50 font-medium capitalize transition-colors border-b border-ash-200/30 dark:border-ash-700/30 last:border-0"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto reveal-hidden">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-ash-900 dark:text-ash-100 leading-tight">
              <span className="text-gradient">Ganga Bharath</span>
              <span className="block text-ash-600 dark:text-ash-400 mt-2 min-h-[1.2em]">
                <RoleSwitcher />
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-ash-600 dark:text-ash-400 mt-6 mb-8 leading-relaxed max-w-3xl mx-auto">
              Computer Science student at VIT-AP University, building practical solutions
              that people actually use and love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#projects" className="inline-flex items-center justify-center bg-ash-900 dark:bg-ash-100 text-ash-50 dark:text-ash-900 px-8 py-3 rounded-lg font-medium hover:bg-ash-800 dark:hover:bg-ash-200 transition-colors w-full sm:w-auto">
                View Projects
              </a>
              <a href="/Ganga_Bharath_Resume.pdf" target="_blank" className="inline-flex items-center justify-center border border-ash-300 dark:border-ash-700 text-ash-900 dark:text-ash-100 px-8 py-3 rounded-lg font-medium hover:bg-ash-100 dark:hover:bg-ash-800 transition-colors w-full sm:w-auto gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 0 1 -2 -2V5a2 2 0 0 1 2 -2h5.586a1 1 0 0 1 .707 .293l5.414 5.414a1 1 0 0 1 .293 .707V19a2 2 0 0 1 -2 2z" /></svg>
                Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About & Experience Section */}
      <section id="about" className="py-16 lg:py-32 reveal-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-8 animate-fadeIn">
              <div className="flex items-center gap-2 mb-4 animate-fadeIn">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest">
                  Available for Internships & Projects
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-ash-900 dark:text-ash-100 tracking-tight">
                <span className="text-gradient">Crafting Digital</span> <br />
                <span className="text-ash-600 dark:text-ash-400">Experiences</span>
              </h2>
              <div className="space-y-6 text-lg text-ash-600 dark:text-ash-400 leading-relaxed">
                <p>
                  Hello there, I am <b>Ganga Bharath</b>. I'm a <b>Computer Science Engineering</b> student at VIT-AP University.
                  I am a Full-Stack Developer skilled in Java, Python, and modern web technologies.
                </p>
                <p>
                  I specialize in building scalable applications and AI-based solutions. My passion lies at the intersection of
                  software development and cybersecurity, creating tools that are both powerful and secure.
                </p>

                {/* Social & Resume Bar */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href="/Ganga_Bharath_Resume.pdf"
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-ash-900 dark:bg-ash-100 text-ash-50 dark:text-ash-900 px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-ash-900/10 dark:shadow-none"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 0 1 -2 -2V5a2 2 0 0 1 2 -2h5.586a1 1 0 0 1 .707 .293l5.414 5.414a1 1 0 0 1 .293 .707V19a2 2 0 0 1 -2 2z" /></svg>
                    Download Resume
                  </a>
                  <div className="h-8 w-px bg-ash-200 dark:bg-ash-800 mx-2 hidden sm:block"></div>
                  <div className="flex items-center gap-4">
                    <a href="https://github.com/bharath-ganga" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white dark:bg-ash-800 border border-ash-200 dark:border-ash-700 hover:border-ash-900 dark:hover:border-ash-100 transition-colors group">
                      <svg className="w-5 h-5 opacity-60 group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/ganga-bharath-a6596b375/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white dark:bg-ash-800 border border-ash-200 dark:border-ash-700 hover:border-ash-900 dark:hover:border-ash-100 transition-colors group">
                      <svg className="w-5 h-5 opacity-60 group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                    <a href="https://leetcode.com/u/GANGA_BHARATH/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white dark:bg-ash-800 border border-ash-200 dark:border-ash-700 hover:border-ash-900 dark:hover:border-ash-100 transition-colors group">
                      <svg className="w-5 h-5 opacity-60 group-hover:opacity-100 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.332-4.363c.467-.467 1.112-.662 1.824-.662.712 0 1.357.195 1.823.662l2.697 2.606c.514.515 1.311.515 1.826 0 .515-.515.515-1.346 0-1.862L15.228 5.67c-1.026-1.027-2.457-1.446-4.04-1.446-1.584 0-3.014.419-4.04 1.446L2.816 10.033c-1.027 1.027-1.446 2.458-1.446 4.041 0 1.583.419 3.014 1.446 4.041l4.332 4.363c1.026 1.027 2.456 1.446 4.04 1.446 1.583 0 3.013-.419 4.04-1.446l4.704-4.74c.515-.516.515-1.347 0-1.863-.516-.515-1.312-.515-1.826 0l-.004 .004zM22.215 13.917c-.515-.516-1.312-.516-1.827 0l-2.73 2.734c-.514.515-.514 1.346 0 1.862.258.258.597.387.937.387s.679-.129.936-.387l2.684-2.687c.515-.516.515-1.347 0-1.863l-.004 -.004z"></path>
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="pt-6 grid grid-cols-3 gap-3">
                  <div className="project-card p-4 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-ash-100 dark:bg-ash-800 flex items-center justify-center text-xl">🚀</div>
                    <div>
                      <div className="font-bold text-ash-900 dark:text-ash-100 text-sm">Full-Stack</div>
                      <div className="text-[10px] text-ash-500 uppercase">Developer</div>
                    </div>
                  </div>
                  <div className="project-card p-4 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-ash-100 dark:bg-ash-800 flex items-center justify-center text-xl">🧠</div>
                    <div>
                      <div className="font-bold text-ash-900 dark:text-ash-100 text-sm">AI & ML</div>
                      <div className="text-[10px] text-ash-500 uppercase">Solutions</div>
                    </div>
                  </div>
                  <div className="project-card p-4 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-ash-100 dark:bg-ash-800 flex items-center justify-center text-xl">🛡️</div>
                    <div>
                      <div className="font-bold text-ash-900 dark:text-ash-100 text-sm">Security</div>
                      <div className="text-[10px] text-ash-500 uppercase">First</div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-ash-200 dark:border-ash-800">
                  <div className="text-xs font-bold text-ash-500 uppercase tracking-widest mb-4">Core Technologies</div>
                  <TechMarquee />
                </div>

                {/* Interactive Terminal */}
                <div className="mt-12 group/term overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 bg-ash-200/50 dark:bg-ash-800/50 rounded-t-xl border-x border-t border-ash-200 dark:border-ash-700">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-[10px] font-mono text-ash-500 ml-2">gb@portfolio: ~</div>
                  </div>
                  <InteractiveTerminal />
                </div>
              </div>
            </div>

            <div className="space-y-8 reveal-hidden [transition-delay:200ms]">
              <h3 className="text-2xl font-bold text-ash-900 dark:text-ash-100 mb-8 tracking-tight">
                <span className="text-gradient">Professional Journey</span>
              </h3>
              <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-2 before:w-0.5 before:bg-ash-200 dark:before:bg-ash-800">
                <div className="relative pl-10 cursor-default group">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-ash-50 dark:border-ash-950 bg-ash-900 dark:bg-ash-100 group-hover:scale-125 transition-transform"></div>
                  <div className="text-sm text-ash-500 mb-1">2023 — Present</div>
                  <h4 className="text-lg font-semibold text-ash-900 dark:text-ash-100">B.Tech in Computer Science</h4>
                  <p className="text-ash-600 dark:text-ash-400">VIT-AP University, Amaravati • CGPA: 7.96</p>
                </div>
                <div className="relative pl-10 cursor-default group">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-ash-50 dark:border-ash-950 bg-ash-400 dark:bg-ash-600 group-hover:scale-125 transition-transform"></div>
                  <div className="text-sm text-ash-500 mb-1">2021 — 2023</div>
                  <h4 className="text-lg font-semibold text-ash-900 dark:text-ash-100">Intermediate (MPC)</h4>
                  <p className="text-ash-600 dark:text-ash-400">Govt Junior College • Percentage: 85.4%</p>
                </div>
                <div className="relative pl-10 cursor-default group">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-ash-50 dark:border-ash-950 bg-ash-400 dark:bg-ash-600 group-hover:scale-125 transition-transform"></div>
                  <div className="text-sm text-ash-500 mb-1">2020 — 2021</div>
                  <h4 className="text-lg font-semibold text-ash-900 dark:text-ash-100">10th Standard</h4>
                  <p className="text-ash-600 dark:text-ash-400">Matrix High School • GPA: 10.0</p>
                </div>
                {/* Education details only now */}
              </div>

              {/* Badges of Expertise - Separate Row */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-ash-900 dark:text-ash-100 mb-8">Badges of Expertise</h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: 'Oracle OCI AI Foundations',
                      issuer: 'Oracle',
                      link: 'https://drive.google.com/file/d/19cFovVK7RqfwaPoBIBqC5G70jjvKYsY3/view?usp=sharing'
                    },
                    {
                      name: 'Java Full Stack Developer',
                      issuer: 'Imarticus Learning',
                      link: 'https://drive.google.com/file/d/1uu7ZfvbmVrVB0sWRv7grTIcKkw-4liNx/view?usp=drive_link'
                    },
                    {
                      name: 'AWS Academy Graduate - Cloud Foundations',
                      issuer: 'AWS Academy',
                      link: 'https://drive.google.com/file/d/1kFhceQC0rQxlr2w7ZPUpc8RUCoO7Xvl4/view?usp=sharing'
                    },
                    {
                      name: 'Git & GitHub Certification',
                      issuer: 'Version Control',
                      link: 'https://drive.google.com/file/d/1Zsg6ePvgON6xDIfjVgVrRAad5HA2UiVi/view?usp=drive_link'
                    },
                    {
                      name: 'Empowerment & Employability',
                      issuer: 'Wadhwani Foundation',
                      link: 'https://drive.google.com/file/d/1KWvO73iLc2-oDhe1Y6rwtvASQclPx1S8/view?usp=sharing'
                    }
                  ].map((cert, idx) => (
                    <a
                      key={idx}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card p-4 sm:p-8 rounded-2xl group/cert hover:border-ash-900/50 dark:hover:border-ash-100/50 transition-all duration-300 block text-center"
                    >
                      <div className="flex flex-col items-center space-y-6">
                        <div className="w-16 h-16 rounded-full bg-ash-100 dark:bg-ash-800 flex items-center justify-center text-3xl group-hover/cert:scale-110 group-hover/cert:rotate-12 transition-all duration-500 shadow-inner">
                          📜
                        </div>
                        <div>
                          <h4 className="font-bold text-ash-900 dark:text-ash-100 text-lg leading-tight mb-2 group-hover/cert:text-ash-600 dark:group-hover/cert:text-ash-400 transition-colors">
                            {cert.name}
                          </h4>
                          <p className="text-xs text-ash-500 uppercase tracking-widest font-medium">{cert.issuer}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* LeetCode Stats Card */}
              <div className="project-card rounded-2xl p-6 mt-12 bg-gradient-to-br from-ash-50 to-ash-100 dark:from-ash-900/40 dark:to-ash-800/40 border-ash-200 dark:border-ash-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0 -.961.414l-4.377 4.406 4.377 4.406a1.374 1.374 0 1 0 1.922 -1.962l-2.45-2.428 2.45-2.427a1.374 1.374 0 0 0 -.961-2.41zm-6.966 4.406a1.374 1.374 0 0 0 -1.374 1.374V15a1.374 1.374 0 0 0 .961 1.312l4.377 1.403v-4.406a1.374 1.374 0 1 0 -2.748 0v2.428l-2.45-.786V5.78a1.374 1.374 0 0 0 -1.14 -.1.403L6.517 4.406zM24 13.483a1.374 1.374 0 0 0 -.414-.961l-4.406-4.377-4.406 4.377a1.374 1.374 0 1 0 1.962 1.922l2.428-2.45 2.427 2.45A1.374 1.374 0 0 0 24 13.483zM0 13.483a1.374 1.374 0 0 0 .414.961l4.406 4.377 4.406-4.377a1.374 1.374 0 1 0 -1.962-1.922l-2.428 2.45-2.427-2.45A1.374 1.374 0 0 0 0 13.483z" /></svg>
                    LeetCode Stats
                  </h4>
                  <a
                    href="https://leetcode.com/u/GANGA_BHARATH/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-ash-500 hover:text-orange-500 transition-colors"
                  >
                    @GANGA_BHARATH
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500"><AnimatedCounter value={120} /></div>
                    <div className="text-xs text-ash-500 uppercase tracking-wider mt-1">Easy</div>
                  </div>
                  <div className="text-center border-x border-ash-200 dark:border-ash-800">
                    <div className="text-2xl font-bold text-yellow-500"><AnimatedCounter value={85} /></div>
                    <div className="text-xs text-ash-500 uppercase tracking-wider mt-1">Medium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500"><AnimatedCounter value={15} /></div>
                    <div className="text-xs text-ash-500 uppercase tracking-wider mt-1">Hard</div>
                  </div>
                </div>
              </div>

              {/* Digital Toolkit */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-ash-900 dark:text-ash-100 mb-6 tracking-tight">Digital Toolkit</h3>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { name: 'React.js', icon: '⚛️' },
                    { name: 'Tailwind', icon: '🌊' },
                    { name: 'Node.js', icon: '🟢' },
                    { name: 'VS Code', icon: '💻' },
                    { name: 'Figma', icon: '🎨' },
                    { name: 'Docker', icon: '🐋' },
                    { name: 'Linux', icon: '🐧' },
                    { name: 'Postman', icon: '🚀' }
                  ].map((tool) => (
                    <div key={tool.name} className="project-card p-4 rounded-xl flex flex-col items-center gap-2 group/tool">
                      <span className="text-2xl group-hover/tool:scale-110 group-hover/tool:rotate-12 transition-all">{tool.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-ash-500">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub Stats Card */}
              <div className="project-card rounded-2xl p-6 mt-12 bg-gradient-to-br from-ash-900 to-ash-950 text-white border-white/5 overflow-hidden relative">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-ash-100/5 rounded-full blur-3xl"></div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">GitHub Productivity</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Syncing active...</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-2xl font-bold font-mono"><AnimatedCounter value={214} />+</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Commits</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono"><AnimatedCounter value={15} /></div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Repositories</div>
                  </div>
                  <div className="col-span-2">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex gap-1">
                      <div className="h-full bg-yellow-500 w-[60%]"></div>
                      <div className="h-full bg-blue-500 w-[25%]"></div>
                      <div className="h-full bg-green-500 w-[15%]"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-[8px] text-white/30 uppercase tracking-tighter">
                      <span>JavaScript 60%</span>
                      <span>Java 25%</span>
                      <span>Python 15%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hobbies Section */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-ash-900 dark:text-ash-100 mb-6">Interests & Hobbies</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Ethical Hacking', icon: '🕵️‍♂️' },
                    { name: 'Web Architecture', icon: '🏗️' },
                    { name: 'UI/UX Design', icon: '✨' },
                    { name: 'Open Source', icon: '🌍' },
                    { name: 'Problem Solving', icon: '🧩' }
                  ].map((hobby) => (
                    <span key={hobby.name} className="skill-tag px-4 py-2 rounded-xl text-xs flex items-center gap-2">
                      <span>{hobby.icon}</span>
                      {hobby.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 reveal-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-ash-900 dark:text-ash-100 tracking-tight">
              <span className="text-gradient">Featured</span> <br />
              <span className="text-ash-600 dark:text-ash-400">Projects</span>
            </h2>
            <p className="max-w-md text-ash-600 dark:text-ash-400">
              A collection of digital products and research projects focusing on AI, security, and user experience.
            </p>
          </div>

          <div className="space-y-20">
            {/* WearYourStyle - Featured */}
            <div className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <a
                href="https://wear-your-style.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 lg:col-span-7 overflow-hidden rounded-2xl project-card h-48 sm:h-72 lg:h-[400px] block relative"
              >
                <img
                  src="/projects-wear.png"
                  alt="WearYourStyle Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-ash-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white font-bold border border-white/20">
                    View Live Project
                  </div>
                </div>
              </a>
              <div className="col-span-1 lg:col-span-5 space-y-6">
                <div className="text-sm font-bold text-ash-500 uppercase tracking-widest">Featured Project</div>
                <h3 className="text-3xl font-bold text-ash-900 dark:text-ash-100">
                  WearYourStyle
                </h3>
                <p className="text-lg text-ash-600 dark:text-ash-400 leading-relaxed">
                  An AI-Powered Fashion Marketplace featuring real-time virtual try-on.
                  Used MediaPipe and OpenCV to overlay garments on user pose data with high precision.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'Python', 'OpenCV', 'MediaPipe'].map(skill => (
                    <span key={skill} className="skill-tag px-3 py-1 rounded-full text-xs">{skill}</span>
                  ))}
                </div>
                <div className="flex items-center gap-6 pt-4">
                  <a
                    href="https://github.com/bharath-ganga/WearYourStyle-new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity hover:text-ash-900 dark:hover:text-ash-100"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    GITHUB →
                  </a>
                  <a
                    href="https://wear-your-style.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity hover:text-ash-900 dark:hover:text-ash-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-4M14 4h6m0 0v6m0 -6L10 14" /></svg>
                    LIVE DEMO →
                  </a>
                </div>
              </div>
            </div>

            {/* Grid for other projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              {/* Expense Tracker */}
              <div className="space-y-6 group">
                <a
                  href="https://expensivetracker-teal.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-64 rounded-2xl project-card overflow-hidden block relative"
                >
                  <img
                    src="/projects-expense.png"
                    alt="Expense Tracker Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-ash-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold border border-white/20">
                      View Live Project
                    </span>
                  </div>
                </a>
                <h3 className="text-2xl font-bold text-ash-900 dark:text-ash-100">Expense Tracker</h3>
                <p className="text-ash-600 dark:text-ash-400">
                  A full-stack finance tracking app with automated categorization and insightful dashboard visualizations.
                </p>
                <div className="flex items-center gap-6">
                  <a
                    href="https://github.com/bharath-ganga/expensivetracker_intern.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity hover:text-ash-900 dark:hover:text-ash-100"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    GITHUB →
                  </a>
                  <a
                    href="https://expensivetracker-teal.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity hover:text-ash-900 dark:hover:text-ash-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-4M14 4h6m0 0v6m0 -6L10 14" /></svg>
                    LIVE DEMO →
                  </a>
                </div>
              </div>

              {/* SDN DDoS Detection */}
              <div className="space-y-6 group">
                <a
                  href="https://github.com/bharath-ganga/ML-Based-SDN-DDoS-Detection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-64 rounded-2xl project-card overflow-hidden block relative"
                >
                  <img
                    src="/projects-cyber.png"
                    alt="Cybersecurity Research Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-ash-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold border border-white/20">
                      View Research
                    </span>
                  </div>
                </a>
                <h3 className="text-2xl font-bold text-ash-900 dark:text-ash-100">SDN DDoS Detection</h3>
                <p className="text-ash-600 dark:text-ash-400">
                  Research-based ML model for detecting network attacks in software-defined network architectures.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/bharath-ganga/ML-Based-SDN-DDoS-Detection"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity hover:text-ash-900 dark:hover:text-ash-100"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    GITHUB →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-white/30 dark:bg-ash-900/30 reveal-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-ash-900 dark:text-ash-100 mb-4 tracking-tight">
              <span className="text-gradient">Technical Skills</span>
            </h2>
            <p className="text-ash-600 dark:text-ash-400 text-lg">Tools and languages I use to bring ideas to life.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: 'Languages', skills: ['TypeScript', 'JavaScript', 'Java', 'Python'] },
              { title: 'Frontend', skills: ['React', 'Next.js', 'Expo', 'Tailwind CSS'] },
              { title: 'Backend', skills: ['Node.js', 'Bun.js', 'Fastify', 'Express', 'Flask'] },
              { title: 'Databases', skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'] },
              { title: 'Tools & Cloud', skills: ['Git', 'Docker', 'Kubernetes', 'OpenTelemetry', 'AWS', 'Vercel', 'Oracle OCI'] },
              { title: 'Currently Learning', skills: ['Machine Learning'] }
            ].map((cat, i) => (
              <div key={i} className="project-card p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-ash-900 dark:text-ash-100 border-b border-ash-200 dark:border-ash-800 pb-2">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(s => <span key={s} className="skill-tag px-3 py-1 rounded-full text-xs">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 reveal-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ash-900 dark:text-ash-100 mb-6 lg:mb-8 tracking-tight">
              <span className="text-gradient">Get In Touch</span>
            </h2>
            <p className="text-lg lg:text-xl text-ash-600 dark:text-ash-400 mb-10 lg:mb-12 leading-relaxed">
              Interested in collaborating or discussing opportunities? I'm always open to
              connecting with fellow developers and potential team members.
            </p>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto mb-12">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-ash-800 border border-ash-300 dark:border-ash-700 rounded-lg text-ash-900 dark:text-ash-100 placeholder-ash-500 dark:placeholder-ash-400 focus:outline-none focus:ring-2 focus:ring-ash-600 dark:focus:ring-ash-400 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-ash-800 border border-ash-300 dark:border-ash-700 rounded-lg text-ash-900 dark:text-ash-100 placeholder-ash-500 dark:placeholder-ash-400 focus:outline-none focus:ring-2 focus:ring-ash-600 dark:focus:ring-ash-400 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-ash-800 border border-ash-300 dark:border-ash-700 rounded-lg text-ash-900 dark:text-ash-100 placeholder-ash-500 dark:placeholder-ash-400 focus:outline-none focus:ring-2 focus:ring-ash-600 dark:focus:ring-ash-400 focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Your message..."
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-ash-800 border border-ash-300 dark:border-ash-700 rounded-lg text-ash-900 dark:text-ash-100 placeholder-ash-500 dark:placeholder-ash-400 focus:outline-none focus:ring-2 focus:ring-ash-600 dark:focus:ring-ash-400 focus:border-transparent transition-colors resize-vertical"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium transition-all w-full sm:w-auto ${isSubmitting
                      ? 'bg-ash-600 text-ash-300 cursor-not-allowed'
                      : 'bg-ash-900 dark:bg-ash-100 text-ash-50 dark:text-ash-900 hover:bg-ash-800 dark:hover:bg-ash-200'
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8 -8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3 -2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>

                {/* Success/Error Messages */}
                {formStatus === 'success' && (
                  <div className="text-center animate-fadeIn">
                    <div className="inline-flex items-center px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0 -16 8 8 0 0 0 0 16zm3.707 -9.293a1 1 0 0 0 -1.414 -1.414L9 10.586 7.707 9.293a1 1 0 0 0 -1.414 1.414l2 2a1 1 0 0 0 1.414 0l4 -4z" clipRule="evenodd" />
                      </svg>
                      Message sent successfully!
                    </div>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="text-center animate-fadeIn">
                    <div className="inline-flex items-center px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0 -16 8 8 0 0 0 0 16zM8.707 7.293a1 1 0 0 0 -1.414 1.414L8.586 10l-1.293 1.293a1 1 0 1 0 1.414 1.414L10 11.414l1.293 1.293a1 1 0 0 0 1.414 -1.414L11.414 10l1.293 -1.293a1 1 0 0 0 -1.414 -1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Something went wrong. Please try again.
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center max-w-2xl mx-auto">
              <a
                href="mailto:bharathganga7@gmail.com"
                className="inline-flex items-center justify-center border border-ash-300 dark:border-ash-700 text-ash-900 dark:text-ash-100 px-6 py-3 rounded-lg font-medium hover:bg-ash-100 dark:hover:bg-ash-800 transition-colors w-full sm:w-auto"
              >
                Email
              </a>
              <a
                href="https://github.com/bharath-ganga"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-ash-300 dark:border-ash-700 text-ash-900 dark:text-ash-100 px-6 py-3 rounded-lg font-medium hover:bg-ash-100 dark:hover:bg-ash-800 transition-colors w-full sm:w-auto"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ganga-bharath-a6596b375/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-ash-300 dark:border-ash-700 text-ash-900 dark:text-ash-100 px-6 py-3 rounded-lg font-medium hover:bg-ash-100 dark:hover:bg-ash-800 transition-colors w-full sm:w-auto"
              >
                LinkedIn
              </a>
              <a
                href="https://leetcode.com/u/GANGA_BHARATH/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-ash-300 dark:border-ash-700 text-ash-900 dark:text-ash-100 px-6 py-3 rounded-lg font-medium hover:bg-ash-100 dark:hover:bg-ash-800 transition-colors w-full sm:w-auto"
              >
                LeetCode
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-ash-900 border-t border-ash-200 dark:border-ash-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-ash-600 dark:text-ash-400">
              &copy; {new Date().getFullYear()} Ganga Bharath.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function InteractiveTerminal() {
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([
    { cmd: 'whoami', output: 'Ganga Bharath: Full-Stack Developer & Cybersec Learner' },
    { cmd: 'focus', output: 'Synthesizing secure, scalable web architectures.' }
  ])
  const [input, setInput] = useState('')
  // const terminalRef = useState<HTMLDivElement | null>(null)[0]

  const commands: { [key: string]: string } = {
    'help': 'Available: whoami, focus, skills, clear, echo',
    'whoami': 'Ganga Bharath. CSE Undergrad at VIT-AP. Passionate about bridging the gap between web dev and security.',
    'focus': 'Learning the art of penetration testing while perfecting React/Node.js ecosystems.',
    'skills': 'Languages: Java, Python, TS; Web: React, Node, SQL; Security: Network scanning, OWASP Top 10.',
    'clear': 'CLEAR_HISTORY'
  }

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanInput = input.toLowerCase().trim()
    if (!cleanInput) return

    if (cleanInput === 'clear') {
      setHistory([])
    } else {
      const output = commands[cleanInput] || `Command not found: ${cleanInput}. Type 'help' for options.`
      setHistory([...history, { cmd: input, output }])
    }
    setInput('')
  }

  return (
    <div
      className="bg-ash-900 border-x border-b border-ash-700 p-4 font-mono text-xs text-green-500 h-48 overflow-y-auto rounded-b-xl scrollbar-hide"
      onClick={() => document.getElementById('term-input')?.focus()}
    >
      {history.map((item, i) => (
        <div key={i} className="mb-2">
          <div className="flex gap-2">
            <span className="text-ash-500">➜</span>
            <span className="text-ash-100">{item.cmd}</span>
          </div>
          <div className="text-ash-400 mt-1 pl-4 break-words">{item.output}</div>
        </div>
      ))}
      <form onSubmit={handleCommand} className="flex gap-2">
        <span className="text-ash-500">➜</span>
        <input
          id="term-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-ash-100 flex-1"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  )
}

function TechMarquee() {
  const techs = ['Java', 'Python', 'React', 'Node.js', 'TypeScript', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'Fastify', 'MediaPipe', 'OpenCV']
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
  )
}

function RoleSwitcher() {
  const roles = ['Full-Stack Developer', 'AI Solutions Architect', 'Cybersecurity Enthusiast', 'Problem Solver']
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length)
        setFade(true)
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`transition-all duration-500 inline-block ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {roles[index]}
    </span>
  )
}

function CurrentTime() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = date.getHours() % 12 || 12
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = date.getHours() >= 12 ? 'pm' : 'am'
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()

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
  )
}

function AnimatedCounter({ value, duration = 2000 }: { value: number, duration?: number }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const nodeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true)
      }
    }, { threshold: 0.1 })

    if (nodeRef.current) observer.observe(nodeRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return
    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOut * value))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setCount(value)
      }
    }
    window.requestAnimationFrame(step)
  }, [hasAnimated, value, duration])

  return <span ref={nodeRef}>{count}</span>
}

export default App
