import type { MenuItem } from '../config.tsx'; // your own type if needed
import { useLocation } from 'react-router-dom';

type SidebarProps = {
  menuItems: MenuItem[];
};

const sidebarStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '24px 12px',
  background: '#fff',
  minHeight: '100vh',
  minWidth: '180px',
  boxShadow: '2px 0 8px rgba(0,0,0,0.03)',
};

const linkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  margin: '8px 0',
  padding: '10px 18px',
  borderRadius: '6px',
  border: 'none',
  color: '#1976d2',
  background: '#fff',
  fontWeight: 500,
  fontSize: '1rem',
  textDecoration: 'none',
  transition: 'all 0.18s',
  cursor: 'pointer',
};

const activeLinkStyle: React.CSSProperties = {
  ...linkStyle,
  background: '#f0f6ff',
  color: '#1976d2',
  borderRight: '2px solid #1976d2',
  borderLeft: 'none',
  borderTop: 'none',
  borderBottom: 'none',
  boxShadow: 'none',
};

const hoverLinkStyle: React.CSSProperties = {
  ...linkStyle,
  background: '#e3f0fd',
  border: 'none',
};

const Sidebar = ({ menuItems }: SidebarProps) => {
  const location = useLocation();

  const renderMenuItem = (item: MenuItem) => {
    if (item.type === 'group' && item.children) {
      return (
        <div key={item.id} style={{ marginBottom: '16px' }}>
          <h4 style={{ margin: '8px 0 4px 8px', color: '#1976d2' }}>{item.title}</h4>
          {item.children.map(renderMenuItem)}
        </div>
      );
    }

    if (item.type === 'item') {
      const isActive = location.pathname === item.url;
      return (
        <a
          key={item.id}
          href={item.url}
          style={isActive ? activeLinkStyle : linkStyle}
          onMouseOver={e => {
            if (!isActive) Object.assign(e.currentTarget.style, hoverLinkStyle);
          }}
          onMouseOut={e => {
            if (!isActive) Object.assign(e.currentTarget.style, linkStyle);
          }}
        >
          {item.icon} {item.title}
        </a>
      );
    }
    return null;
  };

  return (
    <nav style={sidebarStyle}>
      {menuItems.map(renderMenuItem)}
    </nav>
  );
};

export default Sidebar;
