import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// --- THIS IS THE CORRECTED IMPORT LINE ---
import { LayoutDashboard, FolderKanban, MessageSquare, User, Settings, LogOut, Star } from 'lucide-react';
import profilePic from '../../assets/client2.png';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) => 
    `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium ${
      isActive
        ? 'bg-primary text-white shadow-lg'
        : 'text-dark-text-secondary hover:bg-dark-card hover:text-dark-text-primary'
    }`;

  return (
    <aside className="w-64 flex-shrink-0 bg-dark-card border-r border-dark-border flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-dark-border">
        <h1 className="text-2xl font-bold text-white">Toh Hanslay</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink to="/admin/dashboard" className={navLinkClass}>
          <LayoutDashboard size={18} className="mr-3" /> Overview
        </NavLink>
        <NavLink to="/admin/projects" className={navLinkClass}>
          <FolderKanban size={18} className="mr-3" /> Projects
        </NavLink>
        <NavLink to="/admin/messages" className={navLinkClass}>
          <MessageSquare size={18} className="mr-3" /> Messages
        </NavLink>
        <NavLink to="/admin/testimonials" className={navLinkClass}>
          <Star size={18} className="mr-3" /> Testimonials
        </NavLink>
        <NavLink to="/admin/profile" className={navLinkClass}>
          <User size={18} className="mr-3" /> Profile
        </NavLink>
        <NavLink to="/admin/settings" className={navLinkClass}>
          <Settings size={18} className="mr-3" /> Settings
        </NavLink>
      </nav>
      <div className="px-4 py-4 border-t border-dark-border">
        <button onClick={logout} className="w-full flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-dark-text-secondary hover:bg-red-500/10 hover:text-red-400">
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;