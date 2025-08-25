// src/components/public/JourneySection.jsx
import { mockExperience, mockEducation } from '../../data/mockData';
import TimelineItem from '../common/TimelineItem';

const JourneySection = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          My Journey & Milestones
        </h2>

        {/* Timeline Grid */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {/* Experience Section */}
            {mockExperience.map((item, index) => (
              <TimelineItem key={`exp-${index}`} item={item} index={index} />
            ))}
            
            {/* Divider (optional but nice) */}
            <div className="border-t border-gray-200 my-8"></div>
            
            {/* Education Section */}
            {mockEducation.map((item, index) => (
              // We add mockExperience.length to the index to continue the animation stagger
              <TimelineItem key={`edu-${index}`} item={item} index={index + mockExperience.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;