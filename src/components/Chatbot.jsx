import React, { useState, useEffect, useRef } from 'react';

// Preloaded knowledge base from Niranjan's resume
const KNOWLEDGE_BASE = {
  about: `Niranjan B is a Software Engineer with 4 years of experience specializing in Python and Go backend architectures, E2E automation frameworks using Playwright, and database schema optimizations. He holds an MCA from PSG College of Technology and is based in Tirupur, India.`,
  
  languages: `Niranjan is proficient in:\n- **Go (Golang)**: Used for writing high-performance APIs and integration platforms.\n- **Python**: Used for Django backend architectures, API validations, and automation scripts.\n- **JavaScript / HTML / CSS**: Experienced with React.js for operational dashboard development.`,
  
  experience: `Here is Niranjan's professional timeline:\n1. **Software Engineer @ Bruhm Services** (June 2025 - Present):\n   - Scalable, concurrent E2E test automation frameworks using Python and Playwright (significantly reducing regression runtimes).\n   - API validation harnesses, contract schema testing, and CI/CD automated gates via GitHub Actions.\n   - Python/Django backend microservices and PostgreSQL database optimization.\n2. **Software Engineer @ Inforvio Technologies** (June 2022 - May 2025):\n   - Go-based integration platforms connecting lenders, credit bureaus, and automated credit evaluation suites.\n   - Headless browser automated agents scripted in Go and Playwright for lender portals.\n   - React frontend dashboard operations and deployment coordination.\n3. **Software Engineer Intern @ Inforvio Technologies** (Dec 2021 - May 2022):\n   - Employer Categorization browser automation using Django, Python, and Playwright.\n   - Web scraping and normalization scripts reducing lead ingestion latency by 75%.`,
  
  automation: `Niranjan is an automation specialist, skilled in:\n- **Playwright (Python & Go)**: Designing scalable, concurrent E2E frameworks, Page Object Model (POM) structures, and headless browser agents.\n- **API Validation**: Constructing contract check systems with pytest, JSON Schema, and mock response servers.\n- **CI/CD Integration**: Automating test runs in GitHub Actions, configuring Slack alerting, and setting up pipeline quality gates.\n- **Web Scraping & Data Mining**: Scraping, sanitizing, and auto-categorizing data from public registries.`,
  
  education: `Niranjan's academic qualifications:\n- **PSG College of Technology**: Master of Computer Applications (MCA), Aug 2019 - May 2022 (CGPA: 7.6/10).\n- **Sri Ramakrishna College of Arts and Science**: B.Sc in Information Technology, Jun 2016 - May 2019 (CGPA: 6.0/10).`,
  
  contact: `You can reach Niranjan via:\n- **Email**: niranjaniran98@gmail.com\n- **Phone**: +91 9965665726\n- **LinkedIn**: [linkedin.com/in/niranjan-balakrishnan](https://www.linkedin.com/in/niranjan-balakrishnan/)\n- **Location**: Tirupur, Tamil Nadu, India.`,
  
  projects: `Niranjan's core projects include:\n1. **FinLink Engine (Go)**: A high-performance API hub linking lenders and credit bureaus.\n2. **Workforce Reporting Pipeline (Python/Django)**: High-speed workforce tracking logs ingestion and analytics.\n3. **Playwright CI Automation**: End-to-end testing pipeline integrated with GitHub Actions.`,

  default: `I can help you learn more about Niranjan's credentials! Feel free to ask about his:\n- **Skills** (Go, Python, Playwright, React)\n- **Work Experience** (Bruhm Services, Inforvio)\n- **Key Projects** (FinLink, Reporting Pipeline)\n- **Contact Info** or **Education**\n\nOr click one of the quick replies below!`
};

const SYSTEM_PROMPT = `
You are an AI assistant representing Niranjan B, a Software Engineer with 4 years of experience.
Your goal is to answer questions about Niranjan based strictly on his resume:
- Summary: Software Engineer specializing in Python-based automation and backend systems (Django, Go, Playwright).
- Experience:
  1. Software Engineer at Bruhm Services (June 2025 - present): backend services using Python/Django, PostgreSQL schema design, API testing with JSON schema, Playwright automation, GitHub Actions CI/CD.
  2. Software Engineer at Inforvio Technologies (June 2022 - May 2025): Go-based integration platforms (GoFiber, Playwright), React frontend dashboard modules, led on-site client rollout in Pune.
  3. Software Engineer Intern at Inforvio (Dec 2021 - May 2022): Employer Categorization Module with Python/Django/Playwright.
- Skills: Go (Golang), Python, React.js, Playwright, Django, GoFiber, MySQL, PostgreSQL, GitHub Actions, API Testing.
- Education: MCA from PSG College of Technology (2019-2022, CGPA 7.6), B.Sc IT from Sri Ramakrishna College (2016-2019, CGPA 6.0).
- Contact: Email (niranjaniran98@gmail.com), Phone (9965665726), LinkedIn (https://www.linkedin.com/in/niranjan-balakrishnan/), Location (Tirupur).

Keep answers professional, friendly, and concise. Format lists with bullets and bold critical technologies. If a question is unrelated to Niranjan or software development, politely guide them back to his career.
`;

export default function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am Niranjan's AI assistant. Ask me anything about his backend development expertise, automation frameworks, or contact details!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const saveApiKey = (key) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setShowSettings(false);
  };

  const clearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
  };

  const getLocalResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('resume') || q.includes('cv')) {
      return "Sure! Here is a summary of Niranjan's professional resume. You can download the complete PDF copy directly from the card below:";
    }
    if (q.includes('python') || q.includes('django') || q.includes('django') || q.includes('pytest') || q.includes('backend')) {
      if (q.includes('experience') || q.includes('work')) return KNOWLEDGE_BASE.experience;
      return KNOWLEDGE_BASE.languages + "\n\n" + KNOWLEDGE_BASE.about;
    }
    if (q.includes('go') || q.includes('golang') || q.includes('fiber')) {
      return KNOWLEDGE_BASE.experience;
    }
    if (q.includes('playwright') || q.includes('automation') || q.includes('testing') || q.includes('qa') || q.includes('e2e')) {
      return KNOWLEDGE_BASE.automation;
    }
    if (q.includes('education') || q.includes('mca') || q.includes('college') || q.includes('psg') || q.includes('bsc')) {
      return KNOWLEDGE_BASE.education;
    }
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('linkedin') || q.includes('number') || q.includes('reach')) {
      return KNOWLEDGE_BASE.contact;
    }
    if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('work')) {
      return KNOWLEDGE_BASE.projects;
    }
    if (q.includes('skills') || q.includes('stack') || q.includes('framework') || q.includes('database')) {
      return KNOWLEDGE_BASE.languages + "\n\n" + KNOWLEDGE_BASE.automation;
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('who are you')) {
      return KNOWLEDGE_BASE.about + "\n\n" + KNOWLEDGE_BASE.default;
    }
    return KNOWLEDGE_BASE.default;
  };

  const callGeminiAPI = async (userText) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${SYSTEM_PROMPT}\n\nUser Question: ${userText}`
                  }
                ]
              }
            ],
            generationConfig: {
              maxOutputTokens: 500,
              temperature: 0.4
            }
          })
        }
      );
      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error(err);
      return "⚠️ Error talking to Gemini. Please verify your API Key is correct and has quota, or disable API mode to use local responses.";
    }
  };

  const handleSend = async (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const isResumeQuery = textToSend.toLowerCase().includes('resume') || textToSend.toLowerCase().includes('cv');

    // Simulate natural typing delay
    setTimeout(async () => {
      let botText = '';
      if (isResumeQuery) {
        botText = "Sure! Here is a summary of Niranjan's professional resume. You can download the complete PDF copy directly from the card below:";
      } else if (apiKey) {
        // Direct integration using their client key
        botText = await callGeminiAPI(textToSend);
      } else {
        // Static local rule-based response
        botText = getLocalResponse(textToSend);
      }

      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isResumeCard: isResumeQuery
        }
      ]);
    }, 800);
  };

  // Render markdown-like structures (simple parser for bold, lists, and links)
  const formatText = (text) => {
    return text.split('\n').map((line, lineIdx) => {
      // Bullet list items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={lineIdx} style={{ marginLeft: '16px', marginBottom: '4px' }}>{parseInline(line.substring(2))}</li>;
      }
      if (/^\d+\.\s/.test(line)) {
        const dotIdx = line.indexOf('.');
        return <li key={lineIdx} style={{ marginLeft: '16px', listStyleType: 'decimal', marginBottom: '4px' }}>{parseInline(line.substring(dotIdx + 1).trim())}</li>;
      }
      return <p key={lineIdx} style={{ marginBottom: '8px' }}>{parseInline(line)}</p>;
    });
  };

  const parseInline = (line) => {
    // Basic bold **text** parsing
    const parts = line.split('**');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // Render links inside bold if needed, or just standard bold
        return <strong key={index}>{parseLinks(part)}</strong>;
      }
      return parseLinks(part);
    });
  };

  const parseLinks = (text) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const result = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        result.push(text.substring(lastIndex, match.index));
      }
      result.push(
        <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex));
    }

    return result.length > 0 ? result : text;
  };

  if (!isOpen) return null;

  return (
    <div className="chat-window glass-panel animate-fade-in glow-effect">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-bot-identity">
          <div className="chat-avatar">🤖</div>
          <div>
            <span className="chat-name">Niranjan's Assistant</span>
            <span className="chat-status">{apiKey ? 'Gemini AI Active' : 'Offline Knowledge Base'}</span>
          </div>
        </div>
        <div className="chat-controls">
          {/*<button className="chat-ctrl-btn" onClick={() => setShowSettings(!showSettings)} title="Chat Settings">*/}
          {/*  ⚙️*/}
          {/*</button>*/}
          <button className="chat-ctrl-btn" onClick={onClose} title="Close Chat">
            ✖
          </button>
        </div>
      </div>

      {/* Settings Pane */}
      {showSettings && (
        <div className="settings-pane animate-fade-in">
          <h4>AI Model Configuration</h4>
          <p className="settings-desc">
            By default, the chatbot runs client-side with no API calls. Input a <strong>Gemini API Key</strong> 
            to chat about anything beyond the resume!
          </p>
          <div className="settings-inputs">
            <input 
              type="password" 
              placeholder="Paste Gemini API Key..." 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
              className="key-input"
            />
            <div className="settings-actions">
              <button className="btn btn-primary btn-sm" onClick={() => saveApiKey(apiKey)}>Save Key</button>
              {localStorage.getItem('gemini_api_key') && (
                <button className="btn btn-secondary btn-sm btn-clear" onClick={clearApiKey}>Clear Key</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-bubble ${msg.sender}-msg`}>
            <div className="msg-content">
              {formatText(msg.text)}
            </div>
            {msg.isResumeCard && (
              <div className="chat-resume-card">
                <div className="resume-card-header">
                  <div className="pdf-icon-container">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                  <div className="resume-card-title-info">
                    <span className="resume-card-name">Niranjan B</span>
                    <span className="resume-card-role">Software Engineer</span>
                  </div>
                </div>
                <div className="resume-card-body">
                  <div className="resume-detail-item">
                    <span className="detail-label">Experience</span>
                    <span className="detail-value">4+ Years Experience</span>
                  </div>
                  <div className="resume-detail-item">
                    <span className="detail-label">Key Stack</span>
                    <span className="detail-value">Golang, Python, Playwright, React, PostgreSQL</span>
                  </div>
                </div>
                <a href="/Niranjan.pdf" download="Niranjan_B_Resume.pdf" className="resume-download-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download Resume
                </a>
              </div>
            )}
            <span className="msg-time">{msg.time}</span>
          </div>
        ))}
        {isTyping && (
          <div className="message-bubble bot-msg typing-msg">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies */}
      {!isTyping && (
        <div className="quick-replies">
          <button className="qr-btn" onClick={() => handleSend("📄 Resume")}>📄 Resume</button>
          <button className="qr-btn" onClick={() => handleSend("Tell me about your Python & Automation experience.")}>🐍 Python & QA</button>
          <button className="qr-btn" onClick={() => handleSend("What is your Go (Golang) experience?")}>🐹 Go Backend</button>
          <button className="qr-btn" onClick={() => handleSend("Show me your contact details.")}>📧 Contact Info</button>
        </div>
      )}

      {/* Input area */}
      <form 
        className="chat-input-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
      >
        <input 
          type="text" 
          placeholder="Ask me a question about Niranjan..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
        />
        <button type="submit" className="send-btn" disabled={!input.trim() || isTyping}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>

      <style dangerouslySetInnerHTML={{__html: `
        .chat-window {
          position: fixed;
          bottom: 100px;
          right: 30px;
          width: 420px;
          height: 600px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(15, 20, 36, 0.95);
          border: 1px solid var(--border-color);
        }
        .light-theme .chat-window {
          background: rgba(255, 255, 255, 0.95);
        }
        .chat-header {
          background-color: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid var(--border-color);
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chat-bot-identity {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .chat-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }
        .chat-name {
          font-weight: 700;
          font-size: 0.95rem;
          display: block;
        }
        .chat-status {
          font-size: 0.75rem;
          color: var(--accent-secondary);
          display: block;
        }
        .chat-controls {
          display: flex;
          gap: 8px;
        }
        .chat-ctrl-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 1rem;
          padding: 4px;
          transition: color var(--transition-fast);
        }
        .chat-ctrl-btn:hover {
          color: var(--text-primary);
        }
        .settings-pane {
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          padding: 16px;
        }
        .settings-pane h4 {
          font-size: 0.9rem;
          margin-bottom: 6px;
        }
        .settings-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .settings-inputs {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .key-input {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          width: 100%;
        }
        .settings-actions {
          display: flex;
          gap: 8px;
        }
        .btn-sm {
          padding: 6px 12px;
          font-size: 0.8rem;
        }
        .btn-clear {
          border-color: rgba(239, 68, 68, 0.4);
          color: #EF4444;
        }
        .btn-clear:hover {
          background-color: rgba(239, 68, 68, 0.1);
          border-color: #EF4444;
        }
        .chat-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .message-bubble {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          line-height: 1.5;
          position: relative;
        }
        .bot-msg {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          align-self: flex-start;
          border-bottom-left-radius: 4px;
          border: 1px solid var(--border-color);
        }
        .user-msg {
          background: var(--accent-gradient);
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        .user-msg a {
          color: #A5B4FC;
        }
        .msg-time {
          font-size: 0.7rem;
          color: var(--text-muted);
          display: block;
          margin-top: 4px;
          text-align: right;
        }
        .user-msg .msg-time {
          color: rgba(255, 255, 255, 0.7);
        }
        .quick-replies {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 8px 16px;
          border-top: 1px solid var(--border-color);
          white-space: nowrap;
          scroll-snap-type: x mandatory;
        }
        .quick-replies::-webkit-scrollbar {
          height: 4px;
        }
        .qr-btn {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all var(--transition-fast);
          scroll-snap-align: start;
        }
        .qr-btn:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background-color: var(--accent-light);
        }
        .chat-input-form {
          display: flex;
          border-top: 1px solid var(--border-color);
          background-color: rgba(255, 255, 255, 0.01);
        }
        .chat-input-form input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 16px;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.9rem;
          outline: none;
        }
        .send-btn {
          background: transparent;
          border: none;
          color: var(--accent-primary);
          padding: 0 20px;
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .send-btn:hover:not(:disabled) {
          color: var(--accent-secondary);
        }
        .send-btn:disabled {
          color: var(--text-muted);
          cursor: not-allowed;
        }
        
        /* Typing indicator animation */
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 0;
        }
        .typing-indicator span {
          width: 8px;
          height: 8px;
          background-color: var(--text-muted);
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        /* Resume Card inside Chat */
        .chat-resume-card {
          margin-top: 12px;
          background: rgba(20, 27, 45, 0.65);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: var(--shadow-sm);
        }
        .light-theme .chat-resume-card {
          background: rgba(255, 255, 255, 0.85);
        }
        .resume-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pdf-icon-container {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 10px -2px rgba(6, 182, 212, 0.4);
          flex-shrink: 0;
        }
        .resume-card-title-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .resume-card-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .resume-card-role {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .resume-card-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 10px 0;
        }
        .resume-detail-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .resume-detail-item .detail-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.8px;
        }
        .resume-detail-item .detail-value {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .resume-download-btn {
          width: 100%;
          border-radius: var(--radius-full) !important;
          padding: 10px 16px !important;
          font-size: 0.85rem !important;
          font-weight: 600 !important;
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.2) !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          color: white !important;
          background: var(--accent-gradient) !important;
          border: none !important;
          cursor: pointer !important;
          transition: all var(--transition-fast) !important;
          text-decoration: none !important;
        }
        .resume-download-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(6, 182, 212, 0.3) !important;
          opacity: 0.95;
        }

        @media (max-width: 576px) {
          .chat-window {
            width: 100%;
            height: 100%;
            bottom: 0;
            right: 0;
            border-radius: 0;
            border: none;
          }
        }
      `}} />
    </div>
  );
}
