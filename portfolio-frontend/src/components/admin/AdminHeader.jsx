// src/components/admin/AdminHeader.jsx
import { Search, Bell } from 'lucide-react';
import profilePic from '../../assets/client1.png';

const AdminHeader = () => {
  return (
    <header className="h-16 bg-dark-card border-b border-dark-border flex items-center justify-end px-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-text-secondary" />
          <input 
            type="text" 
            placeholder="Search projects..."
            className="pl-10 pr-4 py-2 w-64 bg-dark-bg border border-dark-border rounded-full text-sm text-dark-text-primary focus:ring-primary focus:border-primary"
          />
        </div>
        <button className="text-dark-text-secondary hover:text-dark-text-primary">
          <Bell size={20} />
        </button>
        <img src={profilePic} alt="Admin" className="w-9 h-9 rounded-full border-2 border-primary" />
      </div>
    </header>
  );
};

export default AdminHeader;