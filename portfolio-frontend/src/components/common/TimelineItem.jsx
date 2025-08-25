// src/components/common/TimelineItem.jsx
import { useInView } from 'react-intersection-observer';

const TimelineItem = ({ item, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Stagger the animation of each item
  const delay = index * 150;

  return (
    <div
      ref={ref}
      className={`
        bg-white p-6 rounded-lg border border-gray-200/80 shadow-sm transition-all duration-500 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-2">
        <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-3 py-1 rounded-full">
          {item.role || item.degree}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-800">{item.company || item.institution}</h3>
      <p className="text-sm text-gray-500 mb-3">{item.period}</p>
      <p className="text-gray-600 leading-relaxed">
        {item.description}
      </p>
    </div>
  );
};

export default TimelineItem;