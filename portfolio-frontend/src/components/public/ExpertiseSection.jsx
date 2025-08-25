// src/components/public/ExpertiseSection.jsx
import { useInView } from 'react-intersection-observer';
import { mockExpertise } from '../../data/mockData';

const ExpertiseSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Animated container */}
        <div
          className={`
            transition-all duration-700 ease-out
            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Technical Expertise
          </h2>

          {/* Grid of expertise categories */}
          <div className="max-w-4xl mx-auto space-y-8">
            {mockExpertise.map((categoryItem) => (
              <div key={categoryItem.category} className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{categoryItem.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {categoryItem.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;