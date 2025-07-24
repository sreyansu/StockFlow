import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  CubeIcon,
  TagIcon,
  ChartBarIcon,
  BellIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { userProfile } = useAuth();

    const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: HomeIcon },
    { name: 'Products', href: '/app/products', icon: CubeIcon },
    { name: 'Categories', href: '/app/categories', icon: TagIcon },
    { name: 'Analytics', href: '/app/analytics', icon: ChartBarIcon },
    { name: 'Alerts', href: '/app/alerts', icon: BellIcon },
    { name: 'Movement Logs', href: '/app/movements', icon: ClipboardDocumentListIcon },
    ...(userProfile?.role === 'admin' ? [
      { name: 'User Management', href: '/app/users', icon: UsersIcon },
      { name: 'Settings', href: '/app/settings', icon: Cog6ToothIcon }
    ] : [])
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-blue-400">InventoryPro</h1>
        <p className="text-sm text-gray-400 mt-1">Management System</p>
      </div>
      
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500">
          <p>Logged in as</p>
          <p className="font-medium text-gray-300 truncate">{userProfile?.email}</p>
          <p className="text-blue-400 capitalize">{userProfile?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;