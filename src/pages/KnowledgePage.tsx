import { useState } from 'react';
import type { VideoRecommendationResponse, VideoRecommendationRequest } from '../types';

const defaultCategories = ['Financial Freedom', 'Manifestation Mastery', 'Dream Body'];

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState('learning');
  const [topic, setTopic] = useState('Manifestation Mastery');
  const [awareness, setAwareness] = useState('Intermediate');
  const [recommendation, setRecommendation] = useState<VideoRecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function requestVideo() {
    setLoading(true);
    setRecommendation(null);
    try {
      const payload: VideoRecommendationRequest = {
        topic,
        awareness,
        context: 'User is building a sovereign lifestyle system with a strong dedication to self-mastery and growth.',
      };
      const response = await fetch('/api/video-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setRecommendation(data);
    } catch (error) {
      setRecommendation({
        title: 'Unable to recommend video at this time',
        url: '#',
        channel: 'AEON',
        why: 'The backend could not complete the recommendation. Check API keys and server status.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="label-small">Knowledge</div>
            <h1>Learning & Books</h1>
          </div>
          <div className="status-chip">Dynamic video intelligence</div>
        </div>
        <div className="tab-bar" style={{ marginBottom: 20 }}>
          <button type="button" className={`tab-button ${activeTab === 'learning' ? 'active' : ''}`} onClick={() => setActiveTab('learning')}>
            Learning Path
          </button>
          <button type="button" className={`tab-button ${activeTab === 'books' ? 'active' : ''}`} onClick={() => setActiveTab('books')}>
            Books
          </button>
          <button type="button" className={`tab-button ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => setActiveTab('finance')}>
            Finance Tracker
          </button>
        </div>

        {activeTab === 'learning' && (
          <div className="panel">
            <div className="label-small">Adaptive video recommendation</div>
            <p>
              AEON evaluates your awareness, current rhythms, and goal category before recommending the exact video you need.
            </p>
            <div className="row-grid" style={{ gridTemplateColumns: '1fr 1fr', marginTop: 18, gap: 16 }}>
              <div>
                <label className="label-small">Goal Category</label>
                <select value={topic} onChange={(event) => setTopic(event.target.value)}>
                  {defaultCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-small">Current awareness</label>
                <select value={awareness} onChange={(event) => setAwareness(event.target.value)}>
                  {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
            <button style={{ marginTop: 18 }} type="button" onClick={requestVideo} disabled={loading}>
              {loading ? 'Assessing the best video…' : 'Recommend Next Video'}
            </button>
            {recommendation && (
              <div className="video-card panel" style={{ marginTop: 20 }}>
                <div className="label-small">Recommended Video</div>
                <h3>{recommendation.title}</h3>
                <p style={{ marginTop: 10, color: '#c7d1ff' }}>Channel: {recommendation.channel}</p>
                <p style={{ marginTop: 10 }}>{recommendation.why}</p>
                <a href={recommendation.url} target="_blank" rel="noreferrer">
                  Watch on YouTube
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === 'books' && (
          <div className="panel">
            <div className="label-small">Books curated by AEON</div>
            <div className="row-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16, marginTop: 16 }}>
              {[
                { title: 'The Power of Now', reason: 'Build an unshakable inner presence.' },
                { title: 'Atomic Habits', reason: 'Transform small daily rituals into huge momentum.' },
                { title: 'Becoming Supernatural', reason: 'Align energy, manifestation, and science.' },
                { title: 'Meditations', reason: 'Sharpen discipline through stoic clarity.' },
              ].map((book) => (
                <div key={book.title} className="book-card">
                  <strong>{book.title}</strong>
                  <p style={{ marginTop: 10, color: '#c7d1ff' }}>{book.reason}</p>
                  <button style={{ marginTop: 12 }}>Track Progress</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="panel">
            <div className="label-small">Finance Tracker</div>
            <div className="row-grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, marginTop: 16 }}>
              <div className="panel" style={{ padding: 18 }}>
                <div className="label-small">Monthly Income</div>
                <h3>$1,820</h3>
              </div>
              <div className="panel" style={{ padding: 18 }}>
                <div className="label-small">Expenses</div>
                <h3>$860</h3>
              </div>
              <div className="panel" style={{ padding: 18 }}>
                <div className="label-small">Savings Rate</div>
                <h3>28%</h3>
              </div>
            </div>
            <button style={{ marginTop: 20 }}>Ask AEON to analyse finances</button>
          </div>
        )}
      </div>
    </div>
  );
}
