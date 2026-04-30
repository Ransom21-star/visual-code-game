import { FormEvent, useState } from 'react';
import { ChatMessage } from '../types';

const initialMessages: ChatMessage[] = [
  {
    role: 'aeon',
    text: 'I am AEON. Speak with clarity. I will shape your system, issue missions, and watch the life you are building.',
  },
];

export default function AEONPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;
    const nextMessages: ChatMessage[] = [...messages, { role: 'user', text: draft.trim() }];
    setMessages(nextMessages);
    setDraft('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();
      setMessages((current) => [...current, { role: 'aeon', text: data.reply ?? 'AEON is aligning your query.' }]);
    } catch (error) {
      setMessages((current) => [...current, { role: 'aeon', text: 'AEON could not reach the network. Check your server keys.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="label-small">AEON</div>
            <h1>Live Intelligence</h1>
          </div>
          <div className="status-chip">Voice: Off</div>
        </div>
        <p>
          AEON speaks like a sage, an unfiltered guide. Every response can take action, add missions, or change your
          path.
        </p>
      </div>

      <div className="panel">
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div style={{ fontSize: '0.85rem', color: '#9fafff' }}>{message.role === 'user' ? 'You' : 'AEON'}</div>
              <p>{message.text}</p>
            </div>
          ))}
          {loading && (
            <div className="message aeon">
              <div style={{ fontSize: '0.85rem', color: '#9fafff' }}>AEON</div>
              <p>AEON is synthesizing your request...</p>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="panel" style={{ display: 'grid', gap: 16 }}>
        <div className="label-small">Talk to AEON</div>
        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask AEON to adjust missions, manage frequency, or update the system." />
        <button type="submit" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
}
