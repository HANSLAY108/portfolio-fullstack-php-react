// src/components/public/HomepageSkills.jsx
import React, { useState, useEffect } from 'react';
import { getProfile } from '../../api/profileApi';
import { useInView } from 'react-intersection-observer';
import * as LucideIcons from 'lucide-react'; // Import all icons

const HomepageSkills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const profileData = await getProfile();
        if (profileData && Array.isArray(profileData.skills)) {
          setSkills(profileData.skills);
        }
      } catch (error) {
        console.error("Failed to fetch skills for homepage:", error);
      }
    };
    fetchSkillsData();
  }, []);

  if (skills.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// This is the new, combined sub-component
const SkillCard = ({ skill, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Dynamically get the icon component from lucide-react, with a fallback
  const IconComponent = LucideIcons[skill.icon] || LucideIcons['Code'];

  const delay = index * 100;

  return (
    <div
      ref={ref}
      className={`
        bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all duration-500 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
          <IconComponent className="h-6 w-6 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
          // The width animates when the component comes into view
          style={{ 
            width: inView ? `${skill.level}%` : '0%',
            transitionDelay: `${delay + 200}ms` // Delay the bar animation slightly
          }}
        />
      </div>
      <p className="text-right text-sm text-gray-500 mt-1">{skill.level}%</p>
    </div>
  );
};

export default HomepageSkills;