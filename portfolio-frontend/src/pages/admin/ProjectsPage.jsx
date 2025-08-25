// src/pages/public/ProjectsPage.jsx
import React, { useState, useEffect } from 'react';
import { getProjects } from '../../api/projectsApi';
import ProjectCard from '../../components/common/ProjectCard';
import toast from 'react-hot-toast';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error("Could not load projects.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProjects();
  }, []); // Empty array ensures this runs once

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">My Projects</h1>
          <p className="mt-4 text-gray-600">Discover a selection of my recent work...</p>
        </div>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : (
          projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No projects have been added yet.</p>
          )
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;