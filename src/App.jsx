import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Toggle theme class on body
  useEffect(() => {
    if (isLightTheme) {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [isLightTheme]);

  // Section observer to update navigation active highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#home" className="nav-logo">
            <span className="gradient-text">&lt;Niranjan B /&gt;</span>
          </a>
          
          <div className="nav-links">
            <a 
              href="#home" 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            >
              Home
            </a>
            <a 
              href="#experience" 
              className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
            >
              Experience
            </a>
            <a 
              href="#skills" 
              className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            >
              Contact
            </a>
            <a 
              href="/Niranjan.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="nav-link"
              download="Niranjan_B_Resume.pdf"
            >
              Resume
            </a>
            
            <button 
              className="theme-toggle" 
              onClick={() => setIsLightTheme(!isLightTheme)}
              title={isLightTheme ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {isLightTheme ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Sections */}
      <main>
        <Hero onOpenChat={() => setIsChatOpen(true)} />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-text">
            <p>© {new Date().getFullYear()} Niranjan B</p>
          </div>
          <div className="footer-socials">
            <a 
              href="mailto:niranjaniran98@gmail.com" 
              className="social-icon"
              title="Email Niranjan"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><polyline points="22 7 12 14 2 7"></polyline></svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/niranjan-balakrishnan/" 
              target="_blank" 
              rel="noreferrer" 
              className="social-icon"
              title="LinkedIn Profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Chat Bubble Toggle Button */}
      {!isChatOpen && (
        <button 
          className="chatbot-fab glow-effect animate-float"
          onClick={() => setIsChatOpen(true)}
          title="Chat with my AI assistant"
        >
          <span className="fab-icon">💬</span>
          <span className="fab-pulse"></span>
        </button>
      )}

      {/* Chatbot Interface */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <style dangerouslySetInnerHTML={{__html: `
        /* Floating Action Button (FAB) */
        .chatbot-fab {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--accent-gradient);
          border: none;
          cursor: pointer;
          box-shadow: var(--shadow-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          transition: transform var(--transition-fast);
        }
        .chatbot-fab:hover {
          transform: scale(1.1);
        }
        .fab-icon {
          font-size: 1.6rem;
          color: white;
        }
        .fab-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: var(--accent-primary);
          opacity: 0.4;
          z-index: -1;
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @media (max-width: 576px) {
          .chatbot-fab {
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
          }
          .fab-icon {
            font-size: 1.3rem;
          }
        }
      `}} />
    </div>
  );
}

export default App;
