import React, { useState } from 'react';
import Reveal from './Reveal';

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);

  const jobs = [
    {
      role: "Software Engineer",
      company: "Bruhm Services",
      period: "June 2025 - Present",
      location: "Coimbatore",
      bullets: [
        "Designed and implemented a scalable, concurrent E2E test automation framework using Python, pytest, and Playwright, executing parallel tests to significantly reduce regression suite execution times.",
        "Developed a robust API testing harness in Python to automatically validate endpoints, JSON schemas, integration response contracts, and authentication states across microservices.",
        "Integrated automated test runs into GitHub Actions pipelines, implementing automated Slack reporting and strict CI/CD quality gates to block faulty builds.",
        "Created modular Page Object Models (POMs) and browser utility helpers to seamlessly handle state persistence, dynamic HTML elements, and cross-browser testing conditions.",
        "Collaborated on backend service architecture with Python and Django, structuring high-throughput PostgreSQL schemas for workforce management and activity logging."
      ],
      tags: ["Python", "Django", "Playwright", "pytest", "GitHub Actions", "API Testing", "PostgreSQL", "CI/CD Gates"]
    },
    {
      role: "Software Engineer",
      company: "Inforvio Technologies Pvt Ltd",
      period: "June 2022 - May 2025",
      location: "Coimbatore / Pune (On-site Coordination)",
      bullets: [
        "Built a robust, secure credit bureau and lender integration gateway using Golang and GoFiber, creating mock test rigs to validate automated credit evaluation runs.",
        "Automated administrative lender portal interactions and manual data entry workflows by scripting headless browser automation agents in Python and Playwright.",
        "Developed loan lifecycle state engines and dynamic lender routing rules for a high-volume financial SaaS platform.",
        "Contributed to React-based client panels and dashboard components, improving internal operational efficiency.",
        "Led client-site integration and deployment in Pune, managing QA automation alignment and coordination with a 3-member client engineering team."
      ],
      tags: ["Golang", "GoFiber", "Playwright", "React", "REST APIs", "Integration Testing", "Client Coordination"]
    },
    {
      role: "Software Engineer Intern",
      company: "Inforvio Technologies Pvt Ltd",
      period: "Dec 2021 - May 2022",
      location: "Coimbatore",
      bullets: [
        "Developed and deployed an Employer Categorization module using Python, Django, and Playwright, automating browser-based lead classification workflows.",
        "Built automated web scraping and scraping agents to harvest, normalize, and categorize high-volume employer data, reducing lead ingestion latency and mapping effort by 75%.",
        "Refined backend matching algorithms, ensuring zero database duplication and improving lead filtering accuracy across client datasets."
      ],
      tags: ["Python", "Django", "Playwright", "Web Scraping", "Data Normalization", "Lead Automation"]
    }
  ];

  return (
    <section className="section experience-section" id="experience">
      <Reveal animation="fade-up" delay={0.1}>
        <h2 className="section-title">Professional Journey</h2>
      </Reveal>
      <Reveal animation="fade-up" delay={0.2}>
        <p className="section-subtitle">A timeline of my professional experience in backend engineering and automation architectures.</p>
      </Reveal>
      
      <div className="experience-container">
        {/* Navigation Sidebar/Tabs */}
        <div className="experience-tabs">
          {jobs.map((job, index) => (
            <Reveal key={index} animation="fade-up" delay={index * 0.1} duration={0.6}>
              <button
                className={`exp-tab-btn ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                <span className="tab-company">{job.company}</span>
                <span className="tab-role">{job.role}</span>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Selected Job Detail Panel */}
        {/* We use key={activeTab} to trigger a re-mount & play the reveal transition again when the tab changes */}
        <Reveal key={activeTab} animation="fade-up" duration={0.6} className="experience-details-reveal">
          <div className="experience-details glass-panel">
            <div className="exp-header">
              <div className="exp-title-block">
                <h3>
                  {jobs[activeTab].role} <span className="gradient-text">@ {jobs[activeTab].company}</span>
                </h3>
                <div className="exp-meta">
                  <span className="exp-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {jobs[activeTab].period}
                  </span>
                  <span className="exp-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {jobs[activeTab].location}
                  </span>
                </div>
              </div>
            </div>
            
            <ul className="exp-bullets">
              {jobs[activeTab].bullets.map((bullet, idx) => (
                <li key={idx} className="exp-bullet-item">
                  <span className="bullet-point"></span>
                  <p>{bullet}</p>
                </li>
              ))}
            </ul>

            <div className="exp-tags-container">
              <h4 className="tags-title">Key Technologies:</h4>
              <div className="exp-tags">
                {jobs[activeTab].tags.map((tag, idx) => (
                  <span key={idx} className="exp-tag-badge">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .experience-section {
          position: relative;
        }
        .experience-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
          align-items: start;
        }
        .experience-tabs {
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-left: 2px solid var(--border-color);
          padding-left: 0;
        }
        .experience-details-reveal {
          width: 100%;
        }
        .exp-tab-btn {
          background: transparent;
          border: none;
          text-align: left;
          padding: 16px 20px;
          cursor: pointer;
          border-left: 3px solid transparent;
          margin-left: -2px;
          transition: all var(--transition-fast);
          display: flex;
          flex-direction: column;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          color: var(--text-secondary);
          width: 100%;
        }
        .exp-tab-btn:hover {
          background: var(--accent-light);
          color: var(--accent-primary);
        }
        .exp-tab-btn.active {
          border-left-color: var(--accent-primary);
          background: var(--accent-light);
          color: var(--text-primary);
        }
        .tab-company {
          font-weight: 700;
          font-size: 1rem;
          font-family: var(--font-secondary);
        }
        .tab-role {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .exp-tab-btn.active .tab-role {
          color: var(--accent-primary);
        }
        .experience-details {
          padding: 40px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          width: 100%;
        }
        .exp-header {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 24px;
          margin-bottom: 28px;
        }
        .exp-title-block h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }
        .exp-meta {
          display: flex;
          gap: 20px;
          color: var(--text-muted);
          font-size: 0.9rem;
          flex-wrap: wrap;
        }
        .exp-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .exp-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }
        .exp-bullet-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .bullet-point {
          width: 8px;
          height: 8px;
          background: var(--accent-gradient);
          border-radius: 50%;
          margin-top: 8px;
          flex-shrink: 0;
        }
        .exp-bullet-item p {
          color: var(--text-secondary);
          font-size: 0.98rem;
          line-height: 1.6;
        }
        .exp-tags-container {
          border-top: 1px solid var(--border-color);
          padding-top: 24px;
        }
        .tags-title {
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-bottom: 12px;
          font-weight: 600;
        }
        .exp-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .exp-tag-badge {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--accent-secondary);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }
        .exp-tag-badge:hover {
          border-color: var(--accent-primary);
          background-color: var(--accent-light);
          transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
          .experience-container {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .experience-tabs {
            flex-direction: row;
            border-left: none;
            border-bottom: 2px solid var(--border-color);
            overflow-x: auto;
            padding-bottom: 4px;
            scroll-snap-type: x mandatory;
          }
          .exp-tab-btn {
            border-left: none;
            border-bottom: 3px solid transparent;
            margin-left: 0;
            margin-bottom: -2px;
            border-radius: var(--radius-sm) var(--radius-sm) 0 0;
            flex-shrink: 0;
            scroll-snap-align: start;
            padding: 12px 16px;
            width: auto;
          }
          .exp-tab-btn.active {
            border-bottom-color: var(--accent-primary);
          }
          .experience-details {
            padding: 24px 16px;
          }
        }
      `}} />
    </section>
  );
}
