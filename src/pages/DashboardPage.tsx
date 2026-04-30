export default function DashboardPage() {
  return (
    <div>
      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="label-small">Dashboard</div>
            <h1>Character HUD</h1>
          </div>
          <div className="status-chip">Frequency: Aligned</div>
        </div>
        <div className="meta-grid">
          <div className="panel">
            <div className="label-small">Hunter Profile</div>
            <h3>Ransom Star</h3>
            <p>Rank B • Title: Astral Commander</p>
            <div style={{ marginTop: 14 }}>
              <div className="label-small">XP</div>
              <div style={{ height: 12, background: '#19203a', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: '62%', height: '100%', background: 'linear-gradient(90deg, #7c87ff, #d3c2ff)' }} />
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <div className="label-small">Solars</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>1,260</div>
            </div>
          </div>
          <div className="panel">
            <div className="label-small">AEON Affirmation</div>
            <p>
              I am sovereign in every action. I move through today with a calm focus, claiming what is mine by
              intention and relentless resolve.
            </p>
          </div>
        </div>
      </div>

      <div className="row-grid" style={{ gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        <div className="panel">
          <div className="label-small">Frequency Panel</div>
          <div style={{ display: 'grid', gap: 14, marginTop: 14 }}>
            <div className="panel" style={{ padding: 18 }}>
              <div className="label-small">State</div>
              <h3>Green — Aligned</h3>
              <p>AEON detects strong movement, clear rituals, and momentum in your core mission.</p>
            </div>
            <div className="meta-grid">
              <div className="panel" style={{ padding: 18 }}>
                <div className="label-small">Emotional State</div>
                <p>Grounded with purposeful calm.</p>
              </div>
              <div className="panel" style={{ padding: 18 }}>
                <div className="label-small">Mental State</div>
                <p>Focused, alert, and strategically patient.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="label-small">Active Book</div>
          <div style={{ marginTop: 16 }}>
            <h3>Manifesting Mastery</h3>
            <div style={{ height: 10, background: '#19203a', borderRadius: 999, overflow: 'hidden', marginTop: 12 }}>
              <div style={{ width: '41%', height: '100%', background: '#7c87ff' }} />
            </div>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
              <span>Page 82 / 200</span>
              <span>41%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="label-small">Stats</div>
        <div className="stats-grid" style={{ marginTop: 16 }}>
          {[
            ['Discipline', '78'],
            ['Mindset', '72'],
            ['Vitality', '69'],
            ['Ambition', '83'],
            ['Adaptability', '65'],
            ['Focus', '81'],
            ['Spiritual', '58'],
            ['Emotional', '74'],
          ].map(([label, value]) => (
            <div key={label} className="panel" style={{ padding: 16 }}>
              <div className="label-small">{label}</div>
              <div style={{ fontSize: '1.5rem', marginTop: 8 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
