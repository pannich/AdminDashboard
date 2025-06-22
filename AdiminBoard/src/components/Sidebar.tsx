import type { MenuItem } from '../config.tsx'; // your own type if needed

type SidebarProps = {
  menuItems: MenuItem[];
};

const Sidebar = ({ menuItems }: SidebarProps) => {
  console.log('Sidebar rendering with menuItems:', menuItems);

  const renderMenuItem = (item: MenuItem) => {
    // If it's a group with children, render the children
    if (item.type === 'group' && item.children) {
      return (
        <div key={item.id}>
          <h4>{item.title}</h4>
          {item.children.map(renderMenuItem)}
        </div>
      );
    }

    // If it's an individual item, render the link
    if (item.type === 'item') {
      return (
        <a key={item.id} href={item.url} style={{ display: 'block', margin: '5px' }}>
          {item.icon} {item.title}
        </a>
      );
    }

    return null;
  };

  return (
    <nav>
      {menuItems.map(renderMenuItem)}
    </nav>
  );
};

export default Sidebar;
