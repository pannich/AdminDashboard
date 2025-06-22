import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  PhoneOutlined
} from '@ant-design/icons';

import type { ReactNode } from 'react';
import logo from './assets/images/your-logo.png'; // Replace with your actual logo path
import packageJson from '../package.json';

// Generic type for menu item
interface MenuItem {
  id: string;
  title?: string;
  type: 'group' | 'item';
  icon?: ReactNode;
  url?: string;
  children?: MenuItem[];
}

// Define the menu structure
const home: MenuItem = {
  id: 'home',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/home',
      icon: <HomeOutlined />
    }
  ]
};

const dataEntities: MenuItem = {
  id: 'data',
  type: 'group',
  children: [
    {
      id: 'residents',
      title: 'Residents',
      type: 'item',
      url: '/Residents',
      icon: <UserOutlined />
    },
    {
      id: 'organizations',
      title: 'Organizations',
      type: 'item',
      url: '/Organizations',
      icon: <TeamOutlined />
    },
    {
      id: 'call-history',
      title: 'Call History',
      type: 'item',
      url: '/CallHistory',
      icon: <PhoneOutlined />
    }
  ]
};

export const AppConfig = {
  appName: 'Your App Name',
  logoUrl: logo,
  drawerWidth: 240,
  menuItems: [home, dataEntities],
  toolbarItems: [], // you can add custom buttons here later
  authProviders: [], // ['google'] placeholder auth providers
  version: packageJson.version // or dynamically import from package.json if needed
};

export type { MenuItem };
