import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../api/projectsApi';
import ProjectCard from '../common/ProjectCard';

const FeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const fetchAndFilterProjects = async () => {
      try {
        const allProjects = await getProjects();
        if (Array.isArray(allProjects)) {
          const featured = allProjects.filter(p => p.is_featured === true);
          setFeaturedProjects(featured);
        }
      } catch (error) {
        console.error("Failed to fetch featured projects:", error);
      }
    };
    fetchAndFilterProjects();
  }, []);

  if (featuredProjects.length === 0) {
    return null; // Don't show the section if there's nothing to feature
  }

  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <div className="text-center mt-16">
          <Link to="/projects" className="bg-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-primary-hover shadow-lg">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;