import { NavLink } from 'react-router-dom';

type Page = { path: string; label: string };

interface SidebarProps {
  pages: Page[];
}

export default function Sidebar({ pages }: SidebarProps) {
  return (
    <aside className="sidebar panel">
      <div className="brand">
        <div className="brand-title">SOVEREIGN</div>
        <div className="label-small">AEON system | live RPG network</div>
      </div>
      <nav>
        {pages.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {page.label}
          </NavLink>
        ))}
      </nav>
      <div className="panel" style={{ marginTop: 'auto' }}>
        <div className="label-small">System Log</div>
        <div style={{ marginTop: 12, lineHeight: 1.6, color: '#acb4ff' }}>
          AEON is monitoring your missions, frequency, health, and learning path in real time.
        </div>
      </div>
    </aside>
  );
}
