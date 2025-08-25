// src/pages/public/ProjectDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../../api/projectsApi';
import toast from 'react-hot-toast';
import { ExternalLink, Github, Check } from 'lucide-react';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      try {
        const data = await getProjectBySlug(slug);
        setProject(data);
      } catch (error) { toast.error("Could not find the requested project."); } 
      finally { setIsLoading(false); }
    };
    fetchProject();
  }, [slug]);

  const getFullImageUrl = (url) => {
    if (!url) return '/placeholder.png';
    return `http://localhost/portfolio/portfolio-backend${url}`;
  };

  if (isLoading) return <div className="text-center py-40">Loading project details...</div>;
  if (!project) return <div className="text-center py-40"><h2 className="text-2xl font-bold">Project Not Found</h2></div>;

  const screenshots = Array.isArray(project.screenshots) ? project.screenshots : [];

  return (
    <div className="bg-white text-gray-800">
      <div className="container mx-auto px-4 py-16 sm:py-24 space-y-20">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div><img src={getFullImageUrl(project.image_url)} alt={project.title} className="rounded-lg shadow-2xl w-full" /></div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{project.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700"><ExternalLink size={20} /> Visit Live Project</a>
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-md hover:bg-gray-300"><Github size={20} /> GitHub Repository</a>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-3">
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
            <ul className="space-y-3">{Array.isArray(project.key_features) && project.key_features.map((feature, index) => (<li key={index} className="flex items-start gap-3"><Check size={20} className="text-green-500 mt-1 flex-shrink-0" /><span>{feature}</span></li>))}</ul>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">{Array.isArray(project.tags) && project.tags.map(tag => (<span key={tag} className="bg-gray-100 text-sm font-medium px-3 py-1.5 rounded-full border">{tag}</span>))}</div>
          </div>
        </section>
        {screenshots.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-center mb-12">Project Screenshots</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {screenshots.map((screenshot, index) => (
                <div key={screenshot.id || index} className="rounded-lg overflow-hidden shadow-lg border">
                  <img src={getFullImageUrl(screenshot.image_url)} alt={screenshot.caption || `Screenshot ${index + 1}`} className="w-full h-auto object-cover"/>
                </div>
              ))}
            </div>
          </section>
        )}
        <section className="text-center bg-gray-100 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Explore More Projects</h2>
          <p className="text-gray-600 mb-8">Discover a diverse range of innovative solutions and creative designs.</p>
          <Link to="/projects" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700">View All Projects</Link>
        </section>
      </div>
    </div>
  );
};
export default ProjectDetailPage;