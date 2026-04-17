

import { useState } from 'react'

function App() {
  const [formStatus, setFormStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    <div className="min-h-screen bg-ash-50 dark:bg-ash-950">
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
                Bharath Ganga
              </div>
              
              {/* Navigation Links - Right */}
              <div className="hidden md:flex space-x-6 absolute right-6">
                <a href="#skills" className="text-ash-600 dark:text-ash-400 hover:text-ash-900 dark:hover:text-ash-100 transition-colors duration-200 font-medium text-sm">
                  Skills
                </a>
                <a href="#contact" className="text-ash-600 dark:text-ash-400 hover:text-ash-900 dark:hover:text-ash-100 transition-colors duration-200 font-medium text-sm">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-ash-900 dark:text-ash-100 leading-tight">
              Full-Stack
              <span className="block text-ash-600 dark:text-ash-400 mt-2">Developer</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-ash-600 dark:text-ash-400 mt-6 mb-8 leading-relaxed max-w-3xl mx-auto">
              Computer Science student at VIT-AP University, building practical solutions 
              that people actually use and love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#projects" className="inline-flex items-center justify-center bg-ash-900 dark:bg-ash-100 text-ash-50 dark:text-ash-900 px-8 py-3 rounded-lg font-medium hover:bg-ash-800 dark:hover:bg-ash-200 transition-colors w-full sm:w-auto">
                View Projects
              </a>
              <a href="#contact" className="inline-flex items-center justify-center border border-ash-300 dark:border-ash-700 text-ash-900 dark:text-ash-100 px-8 py-3 rounded-lg font-medium hover:bg-ash-100 dark:hover:bg-ash-800 transition-colors w-full sm:w-auto">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-ash-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-ash-900 dark:text-ash-100 mb-12 lg:mb-16">
            About Me
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <p className="text-base lg:text-lg text-ash-600 dark:text-ash-400 leading-relaxed">
                  Hello there, I am <b>Bharath Ganga</b>. I'm a <b>Computer Science Engineering</b> student at VIT-AP University. 
                  I am a Full-Stack Developer skilled in Java, Python, and modern web technologies.
                </p>
                <p className="text-base lg:text-lg text-ash-600 dark:text-ash-400 leading-relaxed">
                  I am experienced in building scalable applications and AI-based solutions, and highly interested in software development and cybersecurity.
                </p>
                <p className="text-base lg:text-lg text-ash-600 dark:text-ash-400 leading-relaxed">
                  I love competitive programming and actively practice problem-solving on LeetCode. 
                  I also work independently to build complex full-stack and AI-driven projects, exploring new technologies along the way.
                </p>
      </div>
              <div className="bg-ash-50 dark:bg-ash-800 rounded-2xl p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-ash-900 dark:text-ash-100 mb-6">
                  Highlights
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-ash-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-ash-600 dark:text-ash-400">Active problem solver on LeetCode</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-ash-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-ash-600 dark:text-ash-400">Oracle OCI AI Foundations Certified (95%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-ash-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-ash-600 dark:text-ash-400">AWS Cloud Foundations Certified</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-ash-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-ash-600 dark:text-ash-400">Java Full Stack Developer Certified</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-ash-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-ash-600 dark:text-ash-400">Passionate about AI applications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-ash-900 dark:text-ash-100 mb-12 lg:mb-16">
            Featured Projects
          </h2>
          <div className="space-y-8">
            {/* Projects Wrapper */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* WearYourStyle */}
              <div className="project-card rounded-2xl p-6 lg:p-8 col-span-1 lg:col-span-2">
                <h3 className="text-xl lg:text-2xl font-bold text-ash-900 dark:text-ash-100 mb-4">
                  WearYourStyle — AI-Powered Fashion Marketplace
                </h3>
                <p className="text-ash-600 dark:text-ash-400 mb-6 leading-relaxed">
                  Built a full-stack AI fashion platform with real-time virtual try-on using MediaPipe and OpenCV for pose detection. 
                  Designed a scalable architecture with JWT authentication, WebSockets, and Firebase.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="skill-tag px-3 py-1 rounded-full text-xs font-medium">React</span>
                  <span className="skill-tag px-3 py-1 rounded-full text-xs font-medium">Node.js</span>
                  <span className="skill-tag px-3 py-1 rounded-full text-xs font-medium">Python</span>
                  <span className="skill-tag px-3 py-1 rounded-full text-xs font-medium">Firebase</span>
                  <span className="skill-tag px-3 py-1 rounded-full text-xs font-medium">MediaPipe</span>
                  <span className="skill-tag px-3 py-1 rounded-full text-xs font-medium">OpenCV</span>
                </div>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://github.com/bharath-ganga/WearYourStyle" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-ash-900 dark:text-ash-100 font-medium hover:text-ash-600 dark:hover:text-ash-400 transition-colors"
                  >
                    GitHub →
                  </a>
                  <a 
                    href="https://wear-your-style.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-ash-900 dark:text-ash-100 font-medium hover:text-ash-600 dark:hover:text-ash-400 transition-colors"
                  >
                    Live Demo →
                  </a>
                </div>
              </div>

              {/* Expense Tracker */}
              <div className="project-card rounded-2xl p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-ash-900 dark:text-ash-100 mb-4">
                  Expense Tracker Web Application
                </h3>
                <p className="text-ash-600 dark:text-ash-400 mb-6 leading-relaxed">
                  Built a full-stack finance tracking application with authentication and structured data storage.
                  Implemented expense categorization, filtering, and efficient data handling via a clean and user-friendly interface.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="skill-tag px-3 py-1 rounded-full text-xs font-medium">HTML/CSS</span>
                  <span className="skill-tag px-3 py-1 rounded-full text-xs font-medium">JavaScript</span>
                  <span className="skill-tag px-3 py-1 rounded-full text-xs font-medium">Database</span>
                </div>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://github.com/bharath-ganga/expensivetracker_intern.git" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-ash-900 dark:text-ash-100 font-medium hover:text-ash-600 dark:hover:text-ash-400 transition-colors"
                  >
                    GitHub →
                  </a>
                  <a 
                    href="https://expensivetracker-intern.onrender.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-ash-900 dark:text-ash-100 font-medium hover:text-ash-600 dark:hover:text-ash-400 transition-colors"
                  >
                    Live Demo →
                  </a>
                </div>
              </div>

              {/* ML-Based SDN DDoS Detection */}
              <div className="project-card rounded-2xl p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-ash-900 dark:text-ash-100 mb-4">
                  ML-Based SDN DDoS Detection
                </h3>
                <p className="text-ash-600 dark:text-ash-400 mb-6 leading-relaxed">
                  A research project aimed at building a Machine Learning model to detect Distributed Denial of Service (DDoS) attacks in Software-Defined Networking (SDN) and improving detection accuracy.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="skill-tag px-3 py-1 rounded-full text-xs font-medium">Machine Learning</span>
                  <span className="skill-tag px-3 py-1 rounded-full text-xs font-medium">Python</span>
                  <span className="skill-tag px-3 py-1 rounded-full text-xs font-medium">SDN</span>
                </div>
                <div className="flex items-center">
                  <a 
                    href="https://github.com/bharath-ganga/ML-Based-SDN-DDoS-Detection" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-ash-900 dark:text-ash-100 font-medium hover:text-ash-600 dark:hover:text-ash-400 transition-colors"
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-ash-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-ash-900 dark:text-ash-100 mb-12 lg:mb-16">
            Technical Skills
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ash-900 dark:text-ash-100">Languages</h3>
              <div className="flex flex-wrap gap-3">
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">Java</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">Python</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">C/C++</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">JavaScript</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">HTML</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">CSS</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ash-900 dark:text-ash-100">Frameworks</h3>
              <div className="flex flex-wrap gap-3">
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">React.js</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">Tailwind CSS</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">Node.js</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ash-900 dark:text-ash-100">Databases</h3>
              <div className="flex flex-wrap gap-3">
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">MySQL</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ash-900 dark:text-ash-100">Tools / Cloud</h3>
              <div className="flex flex-wrap gap-3">
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">Git</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">Linux</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">Firebase</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">VS Code</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">IntelliJ IDEA</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ash-900 dark:text-ash-100">Concepts</h3>
              <div className="flex flex-wrap gap-3">
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">OOP</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">Data Structures</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">REST APIs</span>
                <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">DBMS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ash-900 dark:text-ash-100 mb-6 lg:mb-8">
              Get In Touch
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
                    className={`inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium transition-all w-full sm:w-auto ${
                      isSubmitting 
                        ? 'bg-ash-600 text-ash-300 cursor-not-allowed' 
                        : 'bg-ash-900 dark:bg-ash-100 text-ash-50 dark:text-ash-900 hover:bg-ash-800 dark:hover:bg-ash-200'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Message sent successfully!
                    </div>
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="text-center animate-fadeIn">
                    <div className="inline-flex items-center px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
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
                Direct Email
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
              &copy; {new Date().getFullYear()} Bharath Ganga.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
