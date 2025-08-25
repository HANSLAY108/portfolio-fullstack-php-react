import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!project) return null; // Safety check

  // Provide safe fallback values for every piece of data
  const title = project.title ?? 'Untitled Project';
  const description = project.description ?? 'No description.';
  const imageUrl = project.image_url ?? '';
  const slug = project.slug ?? '';
  
  const getFullImageUrl = (url) => `http://localhost/portfolio/portfolio-backend${url}`;

  const cardContent = (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-700 ease-out flex flex-col h-full ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${(index || 0) * 100}ms` }}
    >
      <img src={getFullImageUrl(imageUrl)} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-grow">{description}</p>
        <div className="mt-6 flex gap-4 pointer-events-none">
          {project.live_url && <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ExternalLink size={16} /> View Live</span>}
          {project.github_url && <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600"><Github size={16} /> GitHub Repo</span>}
        </div>
      </div>
    </div>
  );

  return slug ? (
    <Link to={`/projects/${slug}`} ref={ref} className="block hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
      {cardContent}
    </Link>
  ) : (
    <div ref={ref} className="h-full">
      {cardContent}
    </div>
  );
};

export default ProjectCard;