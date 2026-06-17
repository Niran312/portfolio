import React, { useState } from 'react';
import Reveal from './Reveal';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!accessKey || !accessKey.trim()) {
      // Demo mode fallback
      setTimeout(() => {
        setLoading(false);
        setIsDemoMode(true);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1200);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Developer Portfolio Contact Form'
        })
      });

      const data = await response.json();

      if (data.success) {
        setLoading(false);
        setIsDemoMode(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Email submission error:', error);
      setLoading(false);
      setApiError(error.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <Reveal animation="fade-up" delay={0.1}>
        <h2 className="section-title">Get In Touch</h2>
      </Reveal>
      <Reveal animation="fade-up" delay={0.2}>
        <p className="section-subtitle">Have a project in mind, automation pipeline to design, or a role to discuss? Drop me a message.</p>
      </Reveal>

      {/* Grid Container */}
      <div className="contact-grid">
        {/* Info Column */}
        <Reveal animation="fade-up" delay={0.15} className="contact-info-reveal">
          <div className="contact-info-panel glass-panel">
            <h3>Contact Information</h3>
            <p className="contact-info-desc">Feel free to reach out directly through any of the channels below.</p>
            
            <div className="contact-details">
              <a href="mailto:niranjaniran98@gmail.com" className="contact-card-premium glass-panel">
                <div className="icon-container-premium">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-svg"><rect x="2" y="4" width="20" height="16" rx="2"></rect><polyline points="22 7 12 14 2 7"></polyline></svg>
                </div>
                <div className="contact-text-premium">
                  <span className="contact-label-premium">Email Me</span>
                  <span className="contact-val-premium">niranjaniran98@gmail.com</span>
                </div>
                <div className="arrow-indicator">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 5"></polyline></svg>
                </div>
              </a>
              
              <a href="tel:+919965665726" className="contact-card-premium glass-panel">
                <div className="icon-container-premium">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path><path d="M14.05 2a9 9 0 0 1 8 8" strokeDasharray="2,2"></path><path d="M14.05 5a6 6 0 0 1 5 5"></path></svg>
                </div>
                <div className="contact-text-premium">
                  <span className="contact-label-premium">Call Me</span>
                  <span className="contact-val-premium">+91 9965665726</span>
                </div>
                <div className="arrow-indicator">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 5"></polyline></svg>
                </div>
              </a>
              
              <a href="https://www.linkedin.com/in/niranjan-balakrishnan/" target="_blank" rel="noreferrer" className="contact-card-premium glass-panel">
                <div className="icon-container-premium">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </div>
                <div className="contact-text-premium">
                  <span className="contact-label-premium">LinkedIn</span>
                  <span className="contact-val-premium">niranjan-balakrishnan</span>
                </div>
                <div className="arrow-indicator">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 5"></polyline></svg>
                </div>
              </a>
              
              <div className="contact-card-premium glass-panel location-card-premium">
                <div className="icon-container-premium">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div className="contact-text-premium">
                  <span className="contact-label-premium">Location</span>
                  <span className="contact-val-premium">Tirupur, Tamil Nadu, India</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Form Column */}
        <Reveal animation="fade-up" delay={0.25} className="contact-form-reveal">
          <div className="contact-form-panel glass-panel">
            {isSubmitted ? (
              <div className="contact-success animate-fade-in">
                <span className="success-icon">{isDemoMode ? '⚙' : '✓'}</span>
                <h3>{isDemoMode ? 'Submitted in Demo Mode' : 'Message Sent Successfully!'}</h3>
                {isDemoMode ? (
                  <p>Your message was parsed successfully! To send real emails, create a free key at <strong>web3forms.com</strong> and save it in your <code>.env</code> file under <code>VITE_WEB3FORMS_KEY</code>.</p>
                ) : (
                  <p>Thank you for reaching out. Niranjan will receive your message and respond shortly.</p>
                )}
                <button className="btn btn-primary" onClick={() => { setIsSubmitted(false); setIsDemoMode(false); }}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'input-error' : ''}
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'input-error' : ''}
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'input-error' : ''}
                    placeholder="Inquiry about automation framework development"
                  />
                  {errors.subject && <span className="error-text">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'input-error' : ''}
                    placeholder="Hi Niranjan, I'd like to discuss a project..."
                  ></textarea>
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                {apiError && <div className="error-banner">{apiError}</div>}

                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                  {loading ? (
                    <span className="spinner-loader"></span>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 32px;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        .contact-info-reveal, .contact-form-reveal {
          width: 100%;
          height: 100%;
        }
        .contact-info-panel, .contact-form-panel {
          padding: 40px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .contact-info-panel h3 {
          font-size: 1.8rem;
          margin-bottom: 12px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .contact-info-desc {
          color: var(--text-secondary);
          margin-bottom: 32px;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
          justify-content: space-between;
        }
        .contact-card-premium {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: rgba(20, 27, 45, 0.45);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          text-decoration: none !important;
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .light-theme .contact-card-premium {
          background: rgba(255, 255, 255, 0.65);
        }
        .contact-card-premium:hover {
          transform: translateY(-4px);
          border-color: var(--accent-primary);
          box-shadow: 0 12px 30px -10px rgba(99, 102, 241, 0.25), var(--shadow-glow);
          background: var(--card-hover-bg);
        }
        .location-card-premium {
          cursor: default;
        }
        .location-card-premium:hover {
          transform: none;
          border-color: var(--border-color);
          box-shadow: none;
          background: rgba(20, 27, 45, 0.45);
        }
        .light-theme .location-card-premium:hover {
          background: rgba(255, 255, 255, 0.65);
        }
        .icon-container-premium {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 16px -6px rgba(6, 182, 212, 0.5);
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }
        .contact-card-premium:hover .icon-container-premium {
          transform: scale(1.08) rotate(3deg);
          box-shadow: 0 12px 24px -6px rgba(6, 182, 212, 0.75), 0 0 15px rgba(99, 102, 241, 0.4);
        }
        .contact-icon-svg {
          transition: transform 0.3s ease;
        }
        .contact-card-premium:hover .contact-icon-svg {
          animation: float 2.5s ease-in-out infinite;
        }
        .contact-text-premium {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .contact-label-premium {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 1.2px;
        }
        .contact-val-premium {
          font-size: 1.02rem;
          font-weight: 700;
          color: var(--text-primary);
          transition: color var(--transition-fast);
          word-break: break-all;
        }
        .contact-card-premium:hover .contact-val-premium {
          color: var(--accent-secondary);
        }
        .arrow-indicator {
          opacity: 0.2;
          color: var(--text-muted);
          transform: translateX(0);
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
        }
        .contact-card-premium:hover .arrow-indicator {
          opacity: 1;
          color: var(--accent-secondary);
          transform: translateX(6px);
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
        }
        .form-group-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .form-group input, .form-group textarea {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.9rem;
          transition: all var(--transition-fast);
          outline: none;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px var(--accent-light);
        }
        .form-group .input-error {
          border-color: #EF4444;
        }
        .error-text {
          font-size: 0.75rem;
          color: #EF4444;
        }
        .submit-btn {
          align-self: center;
          border-radius: var(--radius-full);
          padding: 14px 32px;
          font-size: 0.95rem;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.2);
        }
        .error-banner {
          background-color: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #EF4444;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          text-align: center;
          margin-bottom: 12px;
          width: 100%;
        }
        
        .contact-success {
          text-align: center;
          padding: 40px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .success-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.1);
          color: #10B981;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #10B981;
          margin-bottom: 8px;
        }
        .contact-success h3 {
          font-size: 1.5rem;
        }
        .contact-success p {
          color: var(--text-secondary);
          margin-bottom: 24px;
          max-width: 350px;
        }

        /* Spinner */
        .spinner-loader {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .contact-info-panel, .contact-form-panel {
            padding: 32px;
          }
        }
        @media (max-width: 640px) {
          .contact-info-panel, .contact-form-panel {
            padding: 24px 16px;
          }
        }
        @media (max-width: 576px) {
          .form-group-row {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </section>
  );
}
