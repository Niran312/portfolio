import React, { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

// Sub-component for individual skill progress bar & count-up counter
function SkillItem({ name, level, desc, active, delay }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!active) return;

    const duration = 1800; // 1.8s duration matching CSS transition
    const delayMs = delay * 1000;
    let startTimestamp = null;

    const animate = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic (1 - (1 - x)^3) for organic counting deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCurrentLevel(Math.floor(easeProgress * level));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsCompleted(true);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [active, level, delay]);

  return (
    <div className="skill-item">
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className={`skill-level ${isCompleted ? 'pulse-glow-text' : ''}`}>
          {currentLevel}%
        </span>
      </div>
      <div className="skill-track">
        <div 
          className={`skill-bar ${active ? 'loading' : ''} ${isCompleted ? 'completed' : ''}`}
          style={{ 
            width: active ? `${level}%` : '0%',
            transition: active ? `width 1.8s cubic-bezier(0.1, 0.8, 0.2, 1) ${delay}s` : 'none'
          }}
        >
          {active && !isCompleted && (
            <div 
              className="glow-sweep" 
              style={{ animation: `sweep 1.8s cubic-bezier(0.1, 0.8, 0.2, 1) ${delay}s forwards` }}
            />
          )}
        </div>
      </div>
      <span className="skill-desc">{desc}</span>
    </div>
  );
}

// Sub-component for each category card with its own IntersectionObserver
function SkillCategoryCard({ cat, index }) {
  const cardRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const currentRef = cardRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsRevealed(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1, // Trigger when 10% of card enters viewport
      rootMargin: '0px 0px -40px 0px'
    });

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Sequence: top-left (0) -> top-right (1) -> bottom-left (2) -> bottom-right (3)
  const cardDelay = index * 0.25;

  return (
    <div 
      ref={cardRef}
      className={`skills-category-card glass-panel reveal-el reveal-scale ${isRevealed ? 'revealed' : ''}`}
      style={{
        transitionDelay: `${cardDelay}s`,
        transitionDuration: '0.8s'
      }}
    >
      <div className="category-header">
        <span className="category-icon">{cat.icon}</span>
        <h3>{cat.title}</h3>
      </div>
      
      <div className="category-skills-list">
        {cat.skills.map((skill, sIdx) => {
          // Individual items trigger in cascade after the card starts entering
          const itemDelay = cardDelay + 0.5 + sIdx * 0.15;
          return (
            <SkillItem
              key={sIdx}
              name={skill.name}
              level={skill.level}
              desc={skill.desc}
              active={isRevealed}
              delay={itemDelay}
            />
          );
        })}
      </div>
    </div>
  );
}

// Main component orchestrating everything
export default function Skills() {
  const skillCategories = [
    {
      title: "Backend Development",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
      ),
      skills: [
        { name: "Django (Python)", level: 90, desc: "Used for high-volume activity monitoring & PostgreSQL schemas" },
        { name: "GoFiber (Golang)", level: 85, desc: "Used for SaaS lifecycle routing & rapid lender integrations" },
        { name: "REST APIs", level: 95, desc: "Designed unified, secure endpoints for credit bureaus & third parties" },
        { name: "Third Party Integrations", level: 90, desc: "Built adapter layers for external APIs & data synchronization" }
      ]
    },
    {
      title: "Programming Languages",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
      ),
      skills: [
        { name: "Python", level: 95, desc: "Primary backend & test automation scripting language" },
        { name: "Go (Golang)", level: 85, desc: "Built high-throughput backend services and integrations" },
        { name: "JavaScript", level: 50, desc: "Used for React interface engineering and custom automation scripts" }
      ]
    },
    {
      title: "QA & Automation",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      ),
      skills: [
        { name: "Playwright", level: 95, desc: "Built advanced web automation suites & portal scraper bots" },
        { name: "API Testing", level: 95, desc: "Created JSON schema validators & automated mock response tests" },
        { name: "Test Case Design", level: 90, desc: "Designed critical workflow tests covering rare race conditions" },
        { name: "Automation Frameworks", level: 95, desc: "Created custom wrappers & reporter integrations from scratch" }
      ]
    },
    {
      title: "Infrastructure & Tools",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></svg>
      ),
      skills: [
        { name: "PostgreSQL", level: 85, desc: "Optimized complex schema structures for high-volume workforce metrics" },
        { name: "MySQL", level: 80, desc: "Managed relational tables, indexes, and write query tuning" },
        { name: "GitHub Actions", level: 90, desc: "Integrated test suites with automated builds triggered on push" },
        { name: "React.js", level: 70, desc: "Created internal dashboard modules and metrics views" }
      ]
    }
  ];

  return (
    <section className="section skills-section" id="skills">
      <Reveal animation="fade-up" delay={0.1}>
        <h2 className="section-title">Technical Expertise</h2>
      </Reveal>
      <Reveal animation="fade-up" delay={0.2}>
        <p className="section-subtitle">A comprehensive view of the tools, frameworks, and languages I leverage day-to-day.</p>
      </Reveal>

      <div className="skills-grid">
        {skillCategories.map((cat, idx) => (
          <SkillCategoryCard 
            key={idx} 
            cat={cat} 
            index={idx} 
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        .skills-category-card {
          padding: 32px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          height: 100%;
        }
        .category-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
        }
        .category-icon {
          color: var(--accent-primary);
          display: inline-flex;
          padding: 8px;
          background: var(--accent-light);
          border-radius: var(--radius-sm);
        }
        .category-header h3 {
          font-size: 1.25rem;
          font-family: var(--font-secondary);
        }
        .category-skills-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .skill-item {
          display: flex;
          flex-direction: column;
        }
        .skill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .skill-name {
          color: var(--text-primary);
        }
        .skill-level {
          color: var(--accent-secondary);
          transition: color 0.3s ease-out;
        }
        .skill-track {
          width: 100%;
          height: 6px;
          background: var(--bg-secondary);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 6px;
          position: relative;
        }
        .skill-bar {
          height: 100%;
          background: var(--accent-gradient);
          border-radius: var(--radius-full);
          position: relative;
          overflow: hidden;
          width: 0%;
        }
        
        /* Glow sweep overlay animates left to right inside the progress bar */
        .glow-sweep {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.45) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translateX(-100%);
          /* sweep animation matches the loading length */
        }

        /* Pulse glow overlay on completion */
        .skill-bar.completed {
          animation: barPulse 0.40s ease-out forwards;
        }

        .pulse-glow-text {
          animation: textPulse 0.40s ease-out forwards;
          color: var(--accent-primary) !important;
        }

        @keyframes sweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes barPulse {
          0% {
            box-shadow: none;
          }
          50% {
            box-shadow: 0 0 12px var(--accent-secondary);
          }
          100% {
            box-shadow: none;
          }
        }

        @keyframes textPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
            text-shadow: 0 0 8px var(--accent-primary);
          }
          100% {
            transform: scale(1);
            text-shadow: none;
          }
        }

        /* Accessibility: Reduced motion settings */
        @media (prefers-reduced-motion: reduce) {
          .skill-bar {
            width: var(--level-val) !important;
            transition: none !important;
          }
          .glow-sweep {
            animation: none !important;
            display: none !important;
          }
          .skill-bar.completed, .pulse-glow-text {
            animation: none !important;
          }
        }

        @media (max-width: 992px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}} />
    </section>
  );
}
