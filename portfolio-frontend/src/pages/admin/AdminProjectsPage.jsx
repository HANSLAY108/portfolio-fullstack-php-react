// src/pages/admin/AdminProjectsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getProjects, deleteProject } from '../../api/projectsApi';

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch projects.');
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to permanently delete this project?')) {
      try {
        await deleteProject(projectId);
        toast.success('Project deleted successfully!');
        fetchProjects();
      } catch (error) {
        toast.error('Failed to delete project.');
      }
    }
  };
  
  const getFullImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/150';
    return `http://localhost/portfolio-backend${url}`;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-dark-text-primary">Projects Management</h1>
        <button onClick={() => navigate('/admin/projects/new')} className="flex items-center gap-2 bg-primary text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-primary-hover">
          <Plus size={16} /> Add New Project
        </button>
      </div>
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-dark-text-primary mb-4">Project List</h2>
        <div className="overflow-x-auto">
          {isLoading ? <p className="text-dark-text-secondary text-center py-4">Loading projects...</p> : (
            <table className="w-full text-sm text-left text-dark-text-secondary">
              <thead className="text-xs uppercase bg-dark-bg">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Tech Stack</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-8">No projects found. Add one to get started!</td></tr>
                ) : (
                  projects.map(project => (
                    <tr key={project.id} className="border-b border-dark-border hover:bg-dark-bg">
                      <td><img src={getFullImageUrl(project.image_url)} alt={project.title} className="w-12 h-10 rounded-md object-cover m-2" /></td>
                      <td className="px-4 py-3 text-dark-text-primary font-medium">{project.title}</td>
                      <td className="px-4 py-3 max-w-sm truncate">{project.description}</td>
                      <td><div className="flex flex-wrap gap-1 p-2">{Array.isArray(project.tags) && project.tags.map(tag => <span key={tag} className="bg-dark-bg text-xs px-2 py-1 rounded-full">{tag}</span>)}</div></td>
                      <td><div className="flex justify-center gap-4 p-2">
                        <button onClick={() => navigate(`/admin/projects/edit/${project.id}`)} className="hover:text-primary"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(project.id)} className="hover:text-red-500"><Trash2 size={16} /></button>
                      </div></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminProjectsPage;