import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getDashboardData } from '../../api/dashboardApi';
import { Plus, Edit, Database, Zap, CheckCircle, UploadCloud, Bug, FileText, UserPlus, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Default "skeleton" state to prevent errors before data loads
const initialDashboardState = {
  stats: {
    totalProjects: 0,
    projectsInProgress: 0,
    completedProjects: 0,
  },
  projectUpdates: [],
  teamActivity: [],
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(initialDashboardState);
  const [isLoading, setIsLoading] = useState(true);

  // Using useCallback to stabilize the fetch function for useEffect
  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getDashboardData();
      if (data && data.stats) {
        setDashboardData(data);
      } else {
        setDashboardData(initialDashboardState); // Fallback on malformed data
      }
    } catch (error) {
      toast.error("Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return <div className="text-dark-text-secondary p-4">Loading Dashboard...</div>;
  }

  // Safely access data, falling back to the initial state if needed
  const { stats, projectUpdates, teamActivity } = dashboardData || initialDashboardState;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div><h1 className="text-2xl sm:text-3xl font-bold text-dark-text-primary">Overview</h1></div>
        <div className="flex gap-2">
          <button onClick={() => navigate('/admin/projects/new')} className="flex items-center gap-2 bg-primary text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-primary-hover transition-colors"><Plus size={16} /> Add New Project</button>
          <button onClick={() => navigate('/admin/projects')} className="flex items-center gap-2 bg-dark-card border border-dark-border text-dark-text-secondary font-semibold text-sm px-4 py-2 rounded-md hover:border-primary hover:text-white transition-colors"><Edit size={16} /> Manage All Projects</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={<Database size={20} className="text-blue-400" />} title="Total Projects" value={stats.totalProjects} subtitle="Across all active projects" />
        <StatCard icon={<Zap size={20} className="text-yellow-400" />} title="Projects In Progress" value={stats.projectsInProgress} subtitle="Actively being worked on" />
        <StatCard icon={<CheckCircle size={20} className="text-green-400" />} title="Completed Projects" value={stats.completedProjects} subtitle="Successfully delivered this year" />
      </div>

      {/* Recent Activity Section */}
      <div>
        <h2 className="text-xl font-bold text-dark-text-primary mb-4">Recent Activity</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* --- THIS IS THE CORRECTED PART --- */}
          {/* Pass the correct data from the API response to each card */}
          <ActivityCard title="Project Updates" subtitle="Latest changes to your projects." items={projectUpdates} />
          <ActivityCard title="Team Activity" subtitle="Recent messages and team changes." items={teamActivity} />
          {/* ---------------------------------- */}
        </div>
      </div>
    </div>
  );
};

// --- Helper Components (Unchanged) ---
const StatCard = ({ icon, title, value, subtitle }) => (
    <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
      <div className="flex items-center gap-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <p className="text-sm font-medium text-dark-text-secondary">{title}</p>
          <p className="text-3xl font-bold text-dark-text-primary">{value ?? 0}</p>
          <p className="text-xs text-dark-text-secondary">{subtitle}</p>
        </div>
      </div>
    </div>
);

// Helper for choosing an icon based on activity type
const ActivityIcon = ({ type }) => {
  switch(type) {
    case 'Project Update': return <UploadCloud size={16} />;
    case 'Bug Fix': return <Bug size={16} />;
    case 'Message': return <MessageSquare size={16} />;
    case 'New Member': return <UserPlus size={16} />;
    default: return <FileText size={16} />;
  }
};

const ActivityCard = ({ title, subtitle, items }) => (
  <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
    <h3 className="text-lg font-semibold text-dark-text-primary">{title}</h3>
    <p className="text-sm text-dark-text-secondary mb-6">{subtitle}</p>
    <ul className="space-y-4">
      {items && items.length > 0 ? items.map((item, index) => {
        let timeAgo = 'a while ago';
        try {
          if(item.time) timeAgo = `${formatDistanceToNow(new Date(item.time))} ago`;
        } catch (e) {
          console.error("Invalid date format:", item.time);
        }
        
        return (
          <li key={index} className="flex items-start gap-3 pb-3 border-b border-dark-border last:border-b-0">
            <div className="flex-shrink-0 mt-1 text-dark-text-secondary"><ActivityIcon type={item.type} /></div>
            <div>
              <p className="text-sm text-dark-text-primary">{item.text}</p>
              <p className="text-xs text-dark-text-secondary">{timeAgo}</p>
            </div>
          </li>
        );
      }) : (
        <p className="text-sm text-dark-text-secondary">No recent activity.</p>
      )}
    </ul>
  </div>
);

export default DashboardPage;