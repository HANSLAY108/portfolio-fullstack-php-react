// src/pages/public/ServicesPage.jsx
import { useInView } from 'react-intersection-observer';
import * as LucideIcons from 'lucide-react';
import { mockServices } from '../../data/mockData';

const ServicesPage = () => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <header className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            Our Professional Services
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 leading-relaxed">
            At my studio, I offer tailored digital solutions to empower your vision. My expertise spans across the entire development lifecycle, ensuring high-quality, scalable, and impactful results.
          </p>
        </div>
      </header>

      {/* Services Grid Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// A sub-component for the individual service card with animation
const ServiceCard = ({ service, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const IconComponent = LucideIcons[service.icon];
  const delay = index * 100;

  return (
    <div
      ref={ref}
      className={`
        bg-white p-8 rounded-lg border border-gray-200/80 shadow-sm transition-all duration-500 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-center items-center h-16 w-16 bg-primary/10 rounded-full mb-6">
        {IconComponent && <IconComponent className="h-8 w-8 text-primary" strokeWidth={1.5} />}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
      <p className="text-gray-600 leading-relaxed">{service.description}</p>
    </div>
  );
};

export default ServicesPage;