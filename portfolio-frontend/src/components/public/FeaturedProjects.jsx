// src/components/public/FeaturedProjects.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../api/projectsApi'; // Import the API function
import ProjectCard from '../common/ProjectCard';

const FeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterProjects = async () => {
      try {
        const allProjects = await getProjects();
        if (Array.isArray(allProjects)) {
          // Filter projects where is_featured is true (or 1)
          const featured = allProjects.filter(p => p.is_featured);
          setFeaturedProjects(featured);
        }
      } catch (error) {
        console.error("Failed to fetch featured projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndFilterProjects();
  }, []);

  if (isLoading) {
    // Optional: add a simple loading skeleton
    return (
      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">Featured Projects</h2>
          <div className="text-center text-gray-500">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          Featured Projects
        </h2>
        
        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No featured projects to display at the moment.</p>
        )}

        <div className="text-center mt-16">
          <Link
            to="/projects"
            className="bg-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-primary-hover transition-all duration-300 shadow-lg"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;