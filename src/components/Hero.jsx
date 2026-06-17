import React from 'react';
import Reveal from './Reveal';

export default function Hero({ onOpenChat }) {
  return (
    <section className="section hero-section" id="home">
      <div className="hero-content-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div className="hero-info">
          <Reveal animation="fade-up" delay={0.1}>
            <div className="badge-container">
              <span className="badge-glow"></span>
              <span className="badge-text">Available for Opportunities</span>
            </div>
          </Reveal>

          <Reveal animation="fade-up" delay={0.25}>
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Niranjan B</span>
            </h1>
          </Reveal>

          <Reveal animation="fade-up" delay={0.4}>
            <h2 className="hero-subtitle">Software / Automation Engineer</h2>
          </Reveal>

          <Reveal animation="fade-up" delay={0.55}>
            <p className="hero-desc">
              With 4 years of experience in fintech and enterprise SaaS, I specialize in building 
              robust backend services in <strong>Go</strong> and <strong>Python</strong>, crafting scalable E2E automation 
              frameworks with <strong>Playwright</strong>, and optimizing CI/CD pipelines to slash testing cycles.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={0.7}>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View Featured Work
              </a>
              <button className="btn btn-secondary" onClick={onOpenChat}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                Chat with my AI
              </button>
            </div>
          </Reveal>

          <Reveal animation="fade-up" delay={0.85}>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-val">4+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">100%</span>
                <span className="stat-label">Automation Focus</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">Go & Py</span>
                <span className="stat-label">Core Languages</span>
              </div>
            </div>
          </Reveal>
        </div>
        
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hero-section {
          padding-top: 140px;
          padding-bottom: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 80px);
        }
        .hero-content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }
        .hero-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .badge-container {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent-light);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          margin-bottom: 24px;
          position: relative;
        }
        .badge-glow {
          width: 8px;
          height: 8px;
          background-color: var(--accent-secondary);
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 10px var(--accent-secondary);
          animation: pulse 2s infinite;
        }
        .badge-text {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .hero-title {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 18px;
          font-weight: 800;
        }
        .hero-subtitle {
          font-size: 1.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }
        .hero-desc {
          font-size: 1.15rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 680px;
          line-height: 1.6;
        }
        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 56px;
          flex-wrap: wrap;
        }
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          border-top: 1px solid var(--border-color);
          padding-top: 36px;
          width: 100%;
          max-width: 600px;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .stat-val {
          font-size: 2rem;
          font-weight: 800;
          color: var(--accent-primary);
          font-family: var(--font-secondary);
        }
        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 100px;
            padding-bottom: 60px;
          }
          .hero-title {
            font-size: 3rem;
          }
          .hero-subtitle {
            font-size: 1.5rem;
          }
          .hero-stats {
            gap: 32px;
            flex-wrap: wrap;
          }
        }
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1.25rem;
          }
        }
      `}} />
    </section>
  );
}
