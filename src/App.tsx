import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import { ArrowDownRight, ArrowUpRight, Award, BookOpen, BriefcaseBusiness, CheckCircle2, Code2, Download, ExternalLink, GitBranch, Mail, Menu, Send, ShieldCheck, Sparkles, X } from 'lucide-react'
import { certifications } from './data/certifications'
import { educationHistory } from './data/experience'
import { projects } from './data/projects'
import { digitalToolkit, hobbies, technicalSkills } from './data/skills'
import type { Project } from './data/types'
import { AnimatedCounter } from './components/ui/AnimatedCounter'
import { InteractiveTerminal } from './components/ui/InteractiveTerminal'
import { RoleSwitcher } from './components/ui/RoleSwitcher'
import { TechMarquee } from './components/ui/TechMarquee'

const navItems = ['About', 'Projects', 'Research', 'Skills', 'Contact']
const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/bharath-ganga', icon: GitBranch },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ganga-bharath-a6596b375/', icon: BriefcaseBusiness },
  { label: 'Email', href: 'mailto:bharathganga7@gmail.com', icon: Mail },
]

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-heading"><p className="eyebrow"><span>{eyebrow}</span></p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>
}

function App() {
  const [formStatus, setFormStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [leetcodeStats, setLeetcodeStats] = useState({ easy: 120, medium: 85, hard: 15 })
  const [githubRepos, setGithubRepos] = useState(15)
  const modalRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    fetch('https://leetcode-api-faisalshohag.vercel.app/GANGA_BHARATH').then((res) => res.json()).then((data) => {
      if (data?.easySolved !== undefined) setLeetcodeStats({ easy: data.easySolved, medium: data.mediumSolved, hard: data.hardSolved })
    }).catch(() => undefined)
    fetch('https://api.github.com/users/bharath-ganga').then((res) => res.json()).then((data) => {
      if (data?.public_repos !== undefined) setGithubRepos(data.public_repos)
    }).catch(() => undefined)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedProject || mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedProject, mobileMenuOpen])

  useEffect(() => {
    if (!selectedProject) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    const handleDialogKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
        return
      }
      if (event.key !== 'Tab' || !modalRef.current) return
      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }

    window.addEventListener('keydown', handleDialogKeyboard)
    return () => { window.removeEventListener('keydown', handleDialogKeyboard); previouslyFocused?.focus() }
  }, [selectedProject])

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setIsSubmitting(true)
    const form = event.currentTarget
    try {
      const response = await fetch('https://formsubmit.co/ajax/bharathganga7@gmail.com', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
      setFormStatus(response.ok ? 'success' : 'error'); if (response.ok) form.reset()
    } catch { setFormStatus('error') }
    finally { setIsSubmitting(false); window.setTimeout(() => setFormStatus(''), 5000) }
  }

  const totalSolved = leetcodeStats.easy + leetcodeStats.medium + leetcodeStats.hard

  return <div className="site-shell">
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Ganga Bharath, home"><span className="brand-mark">GB</span><span className="brand-name">Ganga Bharath</span></a>
      <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav>
      <a className="header-cta" href="mailto:bharathganga7@gmail.com">Let's talk <ArrowUpRight size={16} /></a>
      <button className="menu-button" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
    </header>

    <AnimatePresence>{mobileMenuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu"><X size={24} /></button>
      <div>{navItems.map((item, index) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}><span>0{index + 1}</span>{item}</a>)}</div>
      <p>Available for internships and select freelance projects.</p>
    </motion.div>}</AnimatePresence>

    <main>
      <section id="top" className="hero section-pad">
        <div className="hero-copy">
          <div className="availability"><span /> Available for new opportunities</div>
          <p className="hero-kicker">Full-stack & AI developer · VIT-AP University</p>
          <h1>I build digital products that are <span>useful, secure,</span> and made to last.</h1>
          <div className="hero-bottom"><p>I'm Ganga Bharath, a computer science student seeking software engineering internships where I can build thoughtful full-stack, AI, and security-focused products.</p>
            <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <ArrowDownRight size={18} /></a><a className="button button-secondary" href="/resume_ganga.pdf" target="_blank" rel="noreferrer">Résumé <Download size={17} /></a></div>
          </div>
        </div>
        <div className="hero-panel" aria-label="Developer profile summary">
          <div className="panel-topline"><span>Currently</span><span>2026</span></div>
          <div className="role-display"><Code2 size={28} /><RoleSwitcher /></div>
          <div className="hero-code" aria-hidden="true"><span>01</span><code>const craft = &#123;</code><span>02</span><code>&nbsp;&nbsp;thinking: 'clear',</code><span>03</span><code>&nbsp;&nbsp;systems: 'scalable',</code><span>04</span><code>&nbsp;&nbsp;security: 'built-in'</code><span>05</span><code>&#125;;</code></div>
          <div className="panel-footer"><div><strong>Based in</strong><span>India</span></div><div><strong>Focus</strong><span>Web · AI · Security</span></div></div>
        </div>
      </section>

      <div className="tech-strip" aria-label="Core technologies"><TechMarquee /></div>

      <section id="about" className="about section-pad">
        <SectionHeading eyebrow="01 / About" title="Curious by nature. Intentional by design." />
        <div className="about-grid">
          <div className="about-intro"><p className="large-copy">I enjoy the whole process—understanding the problem, shaping the experience, and engineering the system behind it.</p><p>My work sits where full-stack development, applied AI, and cybersecurity meet. I care about building software that feels simple on the surface and stays dependable underneath.</p>
            <div className="social-row">{socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={label}><Icon size={19} /><span>{label}</span><ArrowUpRight size={15} /></a>)}</div>
          </div>
          <div className="journey"><p className="mini-title">Education</p>{educationHistory.map((item) => <article key={item.degree} className="timeline-item"><span className={item.current ? 'active' : ''} /><div><p>{item.period}</p><h3>{item.degree}</h3><small>{item.institution}</small></div></article>)}</div>
        </div>
        <div className="principles-grid"><article><span>01</span><Sparkles /><h3>Purposeful experiences</h3><p>Interfaces with strong hierarchy, useful motion, and zero visual clutter.</p></article><article><span>02</span><Code2 /><h3>Reliable engineering</h3><p>Maintainable systems built around clean decisions and sensible tradeoffs.</p></article><article><span>03</span><ShieldCheck /><h3>Security-minded</h3><p>Privacy and resilience considered from the first line, not added at the end.</p></article></div>
      </section>

      <section id="projects" className="projects section-pad">
        <SectionHeading eyebrow="02 / Selected work" title="Projects built to solve real problems." copy="A mix of product engineering, applied AI, and security research." />
        <div className="project-list">{projects.map((project, index) => <article className={`project-row ${index % 2 ? 'project-row-reverse' : ''}`} key={project.title}>
          <button className="project-image" onClick={() => setSelectedProject(project)} aria-label={`View ${project.title} case study`}><img src={project.image} alt={`${project.title} application interface`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" /><span>View case study <ArrowUpRight size={18} /></span></button>
          <div className="project-content"><p className="project-number">0{index + 1} / 0{projects.length}</p>{project.featured && <div className="featured-label">Featured project</div>}<h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            <div className="project-links"><button onClick={() => setSelectedProject(project)}>Project details <ArrowUpRight size={16} /></button>{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live site <ExternalLink size={15} /></a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer">Source <GitBranch size={15} /></a>}</div>
          </div>
        </article>)}</div>
      </section>

      <section id="research" className="research section-pad">
        <SectionHeading eyebrow="03 / Research work" title="Researching trustworthy AI and secure systems." copy="Academic work across deepfake detection, machine learning, and network security." />
        <article className="research-paper">
          <div className="research-meta">
            <span>2026</span>
            <span>Deepfake detection</span>
          </div>
          <div className="research-main">
            <div className="research-icon"><BookOpen size={26} /></div>
            <div>
              <h3>Robust Deepfake Video Detection Using CNN-Based Spatial Features and Temporal Consistency Analysis</h3>
              <p>Designed a deepfake video detection pipeline using <strong>CNN-based spatial feature extraction</strong> and <strong>temporal consistency analysis</strong>, including frame extraction, face detection, feature fusion, data augmentation, and transfer learning.</p>
              <p>Evaluated the approach on the <strong>FaceForensics++ dataset</strong>. Presented at <strong>IEEE AIDML-2026</strong> in August 2026.</p>
              <div className="research-facts"><div><span>Status</span><strong>Presented</strong></div><div><span>Venue</span><strong>IEEE AIDML-2026</strong></div><div><span>Dataset</span><strong>FaceForensics++</strong></div><div><span>Date</span><strong>August 2026</strong></div></div>
              <div className="research-links">
                <a href="https://drive.google.com/file/d/1rRMCW6owiO4J-cat9Dljc5rQigATfmUn/view?usp=sharing" target="_blank" rel="noreferrer"><Award size={17} /> Presentation certificate <ArrowUpRight size={15} /></a>
                <a href="https://github.com/bharath-ganga/robust-deepfake-video-detection" target="_blank" rel="noreferrer"><GitBranch size={17} /> Research repository <ArrowUpRight size={15} /></a>
              </div>
            </div>
          </div>
          <aside>
            <p className="mini-title">Research pipeline</p>
            <ol>
              <li><span>01</span>Frame extraction</li>
              <li><span>02</span>Face detection</li>
              <li><span>03</span>Spatial feature learning</li>
              <li><span>04</span>Temporal analysis</li>
              <li><span>05</span>Feature fusion</li>
            </ol>
          </aside>
        </article>
        <article className="research-paper research-paper-secondary">
          <div className="research-meta">
            <span>Research study</span>
            <span>Network security</span>
          </div>
          <div className="research-main">
            <div className="research-icon"><ShieldCheck size={26} /></div>
            <div>
              <h3>SDN DDoS Detection</h3>
              <p>Developed a <strong>machine-learning-based detection model</strong> for identifying distributed denial-of-service attacks in software-defined network architectures.</p>
              <p>Implemented multiple classifiers for network traffic analysis, designed the approach for integration with <strong>SDN controllers</strong>, and studied methods for distinguishing legitimate traffic from DDoS floods.</p>
              <div className="research-facts"><div><span>Status</span><strong>Implemented</strong></div><div><span>Domain</span><strong>Network security</strong></div><div><span>Method</span><strong>ML classifiers</strong></div><div><span>Environment</span><strong>SDN controllers</strong></div></div>
              <div className="research-links">
                <a href="https://github.com/bharath-ganga/ML-Based-SDN-DDoS-Detection" target="_blank" rel="noreferrer"><GitBranch size={17} /> Research repository <ArrowUpRight size={15} /></a>
              </div>
            </div>
          </div>
          <aside>
            <p className="mini-title">Research focus</p>
            <ol>
              <li><span>01</span>Traffic collection</li>
              <li><span>02</span>Feature engineering</li>
              <li><span>03</span>ML classification</li>
              <li><span>04</span>DDoS detection</li>
              <li><span>05</span>SDN integration</li>
            </ol>
          </aside>
        </article>
      </section>

      <section className="proof section-pad" aria-labelledby="proof-title">
        <SectionHeading eyebrow="04 / Proof of work" title="Learning in public, shipping in practice." />
        <div className="stats-grid"><article><p>GitHub repositories</p><strong><AnimatedCounter value={githubRepos} /></strong><span>Live count from my public profile</span></article><article><p>LeetCode solved</p><strong><AnimatedCounter value={totalSolved} /></strong><span>{leetcodeStats.easy} easy · {leetcodeStats.medium} medium · {leetcodeStats.hard} hard</span></article><article><p>Research studies</p><strong><AnimatedCounter value={2} /></strong><span>AI integrity and network security</span></article></div>
        <div className="github-board"><div className="board-header"><div><GitBranch size={20} /><span>Contribution activity</span></div><a href="https://github.com/bharath-ganga" target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={15} /></a></div><div className="calendar-wrap"><GitHubCalendar username="bharath-ganga" colorScheme="light" theme={{ light: ['#fffdf7', '#ffd5df', '#ff8fab', '#c9b5ff', '#29202d'] }} blockSize={12} blockMargin={5} fontSize={12} /></div></div>
      </section>

      <section id="skills" className="skills section-pad">
        <SectionHeading eyebrow="05 / Capabilities" title="A practical toolkit for modern products." copy="Technologies I use to move from a rough idea to a dependable release." />
        <div className="skill-grid">{technicalSkills.map((category, index) => <article key={category.title} className="skill-card"><div><span>0{index + 1}</span><h3>{category.title}</h3></div><ul>{category.skills.map((skill) => <li key={skill.name}>{skill.icon ? <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}`} alt="" /> : <span className="skill-dot" />}{skill.name}</li>)}</ul></article>)}</div>
        <div className="lab-grid"><div><p className="mini-title">Try the terminal</p><h3>A small interactive corner.</h3><p>Type <code>help</code> to explore a few commands and learn more about what I'm working on.</p><InteractiveTerminal /></div><div className="toolkit-column"><div><p className="mini-title">Everyday toolkit</p><div className="simple-tags">{digitalToolkit.map((tool) => <span key={tool.name}>{tool.icon} {tool.name}</span>)}</div></div><div><p className="mini-title">Away from the editor</p><div className="simple-tags">{hobbies.map((item) => <span key={item.name}>{item.icon} {item.name}</span>)}</div></div></div></div>
      </section>

      <section className="certifications section-pad"><SectionHeading eyebrow="06 / Credentials" title="Always learning. Always sharpening the craft." /><div className="cert-list">{certifications.map((certification, index) => <a key={certification.name} href={certification.link} target="_blank" rel="noreferrer"><span>0{index + 1}</span><div><h3>{certification.name}</h3><p>{certification.issuer}</p></div><ArrowUpRight size={20} /></a>)}</div></section>

      <section id="contact" className="contact section-pad">
        <div className="contact-copy"><p className="eyebrow"><span>07 / Contact</span></p><h2>Have something worth building?</h2><p>I'm open to internships, product collaborations, and ambitious ideas. Tell me what you're working on.</p><a href="mailto:bharathganga7@gmail.com">bharathganga7@gmail.com <ArrowUpRight size={18} /></a></div>
        <form className="contact-form" onSubmit={handleFormSubmit}><div className="form-row"><label><span>Your name</span><input name="name" type="text" placeholder="Jane Smith" required /></label><label><span>Email address</span><input name="email" type="email" placeholder="jane@company.com" required /></label></div><label><span>What are you thinking about?</span><input name="subject" type="text" placeholder="A new product, role, or collaboration" required /></label><label><span>Tell me a little more</span><textarea name="message" rows={5} placeholder="Project context, goals, timeline..." required /></label><div className="form-footer"><p>I usually reply within 1–2 days.</p><button className="button button-light" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send message'} <Send size={16} /></button></div>{formStatus && <p className={`form-message ${formStatus}`} role="status">{formStatus === 'success' ? <><CheckCircle2 size={17} /> Message sent—I'll get back to you soon.</> : 'Something went wrong. Please try again or email me directly.'}</p>}</form>
      </section>
    </main>

    <footer><div><span className="brand-mark">GB</span><p>Designed and built by Ganga Bharath.</p></div><p>© {new Date().getFullYear()} · India</p><a href="#top">Back to top <ArrowUpRight size={15} /></a></footer>

    <AnimatePresence>
      {selectedProject && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
          <motion.article ref={modalRef} className="project-modal" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ type: 'spring', damping: 28, stiffness: 300 }} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button ref={closeButtonRef} className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project case study"><X size={21} /></button>
            <div className="modal-image"><img src={selectedProject.image} alt={`${selectedProject.title} application interface`} /></div>
            <div className="modal-content">
              <p className="eyebrow"><span>Project case study</span></p>
              <h2 id="project-modal-title">{selectedProject.title}</h2>
              <p className="modal-description">{selectedProject.description}</p>
              <div className="tag-list">{selectedProject.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>

              {selectedProject.metrics && <div className="case-metrics">{selectedProject.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>}

              <div className="case-study-grid">
                <section><span>01 / Problem</span><p>{selectedProject.problem}</p></section>
                <section><span>02 / Solution</span><p>{selectedProject.solution}</p></section>
                <section><span>03 / Outcome</span><p>{selectedProject.outcome}</p></section>
              </div>

              <div className="case-details">
                <section><h3>System architecture</h3><ul>{selectedProject.architecture.map((item) => <li key={item}><Code2 size={16} />{item}</li>)}</ul></section>
                {selectedProject.details && <section><h3>Key capabilities</h3><ul>{selectedProject.details.map((detail) => <li key={detail}><CheckCircle2 size={16} />{detail}</li>)}</ul></section>}
              </div>

              <div className="modal-actions">{selectedProject.demo && <a className="button button-primary" href={selectedProject.demo} target="_blank" rel="noreferrer">View live site <ExternalLink size={16} /></a>}{selectedProject.github && <a className="button button-secondary" href={selectedProject.github} target="_blank" rel="noreferrer">Source code <GitBranch size={16} /></a>}</div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
}

export default App
