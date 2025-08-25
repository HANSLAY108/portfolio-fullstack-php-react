// src/components/common/SkillCard.jsx
import { useInView } from 'react-intersection-observer';
import * as LucideIcons from 'lucide-react';

const SkillCard = ({ skill, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Dynamically get the icon component from lucide-react based on the string name
  const IconComponent = LucideIcons[skill.icon];

  // Stagger the animation of each card
  const animationDelay = index * 100;

  return (
    <div
      ref={ref}
      className={`
        bg-white p-6 rounded-lg border border-gray-200/80 shadow-sm transition-all duration-500 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <div className="flex items-center gap-4">
        {IconComponent && <IconComponent className="h-8 w-8 text-primary" strokeWidth={1.5} />}
        <h3 className="text-lg font-semibold text-gray-700">{skill.name}</h3>
      </div>
      <div className="mt-4">
        {/* Progress Bar Background */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          {/* Animated Progress Bar Fill */}
          <div
            className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: inView ? `${skill.level}%` : '0%',
              transitionDelay: `${animationDelay + 200}ms` // Delay the bar animation slightly
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillCard;