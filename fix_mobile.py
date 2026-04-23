with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

nav_start = content.find('{/* Navigation */}')
nav_end = content.find('</nav>', nav_start) + len('</nav>')

new_nav = """{/* Navigation */}
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
                <a href="#skills" className="text-ash-600 dark:text-ash-400 hover:text-ash-900 dark:hover:text-ash-100 transition-colors duration-200 font-medium text-sm">
                  Skills
                </a>
                <a href="#contact" className="text-ash-600 dark:text-ash-400 hover:text-ash-900 dark:hover:text-ash-100 transition-colors duration-200 font-medium text-sm">
                  Contact
                </a>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-ash-200 dark:hover:bg-ash-800 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
                  ) : (
                    <svg className="w-5 h-5 text-ash-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                  )}
                </button>
              </div>

              {/* Mobile right controls */}
              <div className="md:hidden flex items-center gap-1 absolute right-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-ash-200 dark:hover:bg-ash-800 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
                  ) : (
                    <svg className="w-5 h-5 text-ash-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                  )}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-full hover:bg-ash-200 dark:hover:bg-ash-800 transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <svg className="w-5 h-5 text-ash-900 dark:text-ash-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-ash-900 dark:text-ash-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </nav>"""

new_content = content[:nav_start] + new_nav + content[nav_end:]
with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Done! New file length:', len(new_content))
print('Has mobile menu:', 'mobileMenuOpen' in new_content)
print('Has hamburger icon:', 'M4 6h16M4 12h16M4 18h16' in new_content)
