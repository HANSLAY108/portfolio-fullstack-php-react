import React, { useState, useEffect } from 'react';
import { getProfile } from '../../api/profileApi'; // Use the profile API
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const profileData = await getProfile();
        // Check that the data is valid and skills is an array
        if (profileData && Array.isArray(profileData.skills)) {
          setSkills(profileData.skills);
        }
      } catch (error) {
        // This toast is helpful for debugging if the API call fails
        toast.error("Could not load skills for the homepage.");
        console.error("Failed to fetch skills:", error);
      }
    };
    fetchSkillsData();
  }, []); // Empty array ensures this runs only once when the component mounts

  // If there are no skills, don't render the section
  if (skills.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <SkillProgressBar key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillProgressBar = ({ skill }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.2,    // Trigger when 20% of the item is visible
  });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between">
        <span className="font-semibold text-gray-700">{skill.name}</span>
        <span className="text-gray-500">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
          // The width animates from 0% to the skill's level when it comes into view
          style={{ width: inView ? `${skill.level}%` : '0%' }}
        />
      </div>
    </div>
  );
};

export default SkillsSection;