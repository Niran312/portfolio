import React from 'react';
import Reveal from './Reveal';

export default function Projects() {
  const projects = [
    {
      title: "FinLink Integration Engine",
      category: "Backend Services",
      desc: "A high-performance Golang integration gateway connecting banking institutions, credit bureaus, and external SaaS lenders via a secure unified API standard.",
      challenge: "Coordinated lender API specifications and resolved response variances into a single unified JSON contract, handling up to 10k concurrent loan request routes.",
      tech: ["Go", "GoFiber", "REST APIs", "JSON Schema", "PostgreSQL"],
      stats: [
        { label: "Avg Latency", value: "120ms" },
        { label: "Uptime", value: "99.9%" }
      ]
    },
    {
      title: "Workforce Metrics Reporting Pipeline",
      category: "Data Engineering",
      desc: "A scalable, multitenant activity tracking system that monitors workforce logs, generates attendance metrics, and produces real-time reports.",
      challenge: "Optimized relational database schemas in PostgreSQL to support write-intensive streams, avoiding locking on concurrent workforce activity records.",
      tech: ["Python", "Django", "PostgreSQL", "Cron Tasks", "API Testing"],
      stats: [
        { label: "Daily Volume", value: "5M+ Logs" },
        { label: "CPU Optimize", value: "-40% Load" }
      ]
    },
    {
      title: "Playwright Automated Test CI Pipeline",
      category: "Automation & DevOps",
      desc: "A robust end-to-end automated test harness mimicking complex multi-user journeys, built to execute on GitHub Actions runners automatically upon dev push.",
      challenge: "Minimized build pipeline flakiness and optimized runner resource constraints by designing modular browser-context sharing methods.",
      tech: ["Python", "Playwright", "GitHub Actions", "Docker", "REST Validation"],
      stats: [
        { label: "E2E Coverage", value: "88%" },
        { label: "CI Speedup", value: "-65% Time" }
      ]
    }
  ];

  return (
    <section className="section projects-section" id="projects">
      <Reveal animation="fade-up" delay={0.1}>
        <h2 className="section-title">Featured Architectures</h2>
      </Reveal>
      <Reveal animation="fade-up" delay={0.2}>
        <p className="section-subtitle">A showcase of backend systems and test automation frameworks I've architected and implemented.</p>
      </Reveal>

      <div className="projects-grid">
        {projects.map((proj, idx) => {
          // Alternating left/right slide animations
          const animType = idx % 2 === 0 ? 'fade-left' : 'fade-right';

          return (
            <Reveal 
              key={idx} 
              animation={animType} 
              delay={0.1} 
              duration={0.8}
              className="projects-card-reveal"
            >
              <div className="project-card glass-panel">
                <div className="project-header">
                  <span className="project-category">{proj.category}</span>
                  <h3 className="project-title">{proj.title}</h3>
                </div>
                
                <p className="project-desc">{proj.desc}</p>
                
                <div className="project-challenge-box">
                  <span className="challenge-label">The Challenge:</span>
                  <p className="challenge-text">{proj.challenge}</p>
                </div>

                <div className="project-tech-tags">
                  {proj.tech.map((tag, tIdx) => (
                    <span key={tIdx} className="tech-badge">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .projects-card-reveal {
          height: 100%;
        }
        .project-card {
          padding: 30px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .project-category {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
          display: inline-block;
          margin-bottom: 8px;
        }
        .project-title {
          font-size: 1.35rem;
          margin-bottom: 16px;
          color: var(--text-primary);
        }
        .project-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          line-height: 1.6;
        }
        .project-challenge-box {
          background-color: var(--bg-secondary);
          padding: 16px;
          border-radius: var(--radius-sm);
          border-left: 3px solid var(--accent-primary);
          margin-bottom: 24px;
        }
        .challenge-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }
        .challenge-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .project-tech-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: auto; /* Push tags to bottom of card */
        }
        .tech-badge {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        @media (max-width: 1200px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .project-card {
            padding: 24px;
          }
        }
      `}} />
    </section>
  );
}
