import React, { useState, useRef } from 'react';

const SIDEBAR_STYLE = {
  position: 'fixed',
  right: 0,
  top: 0,
  height: '100vh',
  width: '350px',
  background: '#fff',
  borderLeft: '1px solid #ddd',
  boxShadow: '-2px 0 8px rgba(0,0,0,0.08)',
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s',
};

const HEADER_STYLE = {
  padding: '1rem',
  borderBottom: '1px solid #eee',
  fontWeight: 'bold',
  background: '#f7f7f7',
};

const CHAT_BODY_STYLE = {
  flex: 1,
  overflowY: 'auto',
  padding: '1rem',
  background: '#fafbfc',
};

const FOOTER_STYLE = {
  display: 'flex',
  padding: '1rem',
  borderTop: '1px solid #eee',
  background: '#f7f7f7',
};

const INPUT_STYLE = {
  flex: 1,
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginRight: '0.5rem',
};

const BUTTON_STYLE = {
  padding: '0.5rem 1rem',
  background: '#0070f3',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const TOGGLE_BUTTON_STYLE = {
  position: 'fixed',
  right: '20px',
  bottom: '20px',
  zIndex: 10000,
  background: '#0070f3',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: '56px',
  height: '56px',
  fontSize: '2rem',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
};

function ChatSidebar() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBodyRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/generateText', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', text: data.text || data.error || 'No response.' },
      ]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', text: 'Error: Could not get response.' },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        if (chatBodyRef.current) {
          chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  if (!open) {
    return (
      <button style={TOGGLE_BUTTON_STYLE} onClick={() => setOpen(true)} title="Open chat">
        💬
      </button>
    );
  }

  return (
    <div style={SIDEBAR_STYLE}>
      <div style={HEADER_STYLE}>
        CraftAI Chat Assistant
        <button style={{ float: 'right', border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }} onClick={() => setOpen(false)} title="Close">×</button>
      </div>
      <div style={CHAT_BODY_STYLE} ref={chatBodyRef}>
        {messages.map((msg, i) => (
          <div key={i} style={{ margin: '0.5rem 0', textAlign: msg.from === 'user' ? 'right' : 'left' }}>
            <span style={{
              display: 'inline-block',
              background: msg.from === 'user' ? '#e6f7ff' : '#f0f0f0',
              color: '#222',
              borderRadius: '12px',
              padding: '0.5rem 1rem',
              maxWidth: '80%',
              wordBreak: 'break-word',
            }}>{msg.text}</span>
          </div>
        ))}
        {loading && <div style={{ color: '#888', fontStyle: 'italic' }}>CraftAI is typing...</div>}
      </div>
      <div style={FOOTER_STYLE}>
        <input
          style={INPUT_STYLE}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button style={BUTTON_STYLE} onClick={sendMessage} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatSidebar; 