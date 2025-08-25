import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getProfile, updateProfileData, updateCv } from '../../api/profileApi'; // We still need all functions
import { FileText, X } from 'lucide-react'; // Simplified imports for clarity

const AdminProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [newCvFile, setNewCvFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch the initial profile data
  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      toast.error("Failed to load profile data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Handler for when a new CV file is selected
  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCvFile(file);
      // Optimistically update the display name for immediate feedback
      setProfile(p => ({ ...p, resume_url: file.name }));
    }
  };

  // Handler for the "Update CV" button click
  const handleUpdateCv = async () => {
    if (!newCvFile) {
      toast.error("Please select a new CV file first.");
      return;
    }
    try {
      // The API call only sends the new file
      const response = await updateCv(newCvFile);
      toast.success('CV updated successfully!');
      // Update the state with the new, real URL from the server
      setProfile(p => ({ ...p, resume_url: response.resume_url }));
      setNewCvFile(null); // Clear the selected file state
    } catch (error) {
      toast.error('Failed to update CV.');
      // Optional: revert the optimistic UI update on failure
      fetchProfile();
    }
  };

  if (isLoading) return <p className="text-dark-text-secondary">Loading profile...</p>;
  if (!profile) return <p className="text-dark-text-secondary">Could not load profile data.</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-dark-text-primary">Profile Management</h1>
      
      {/* Non-functional placeholder cards for other sections */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-6 opacity-60 cursor-not-allowed">
        <h2 className="text-xl font-semibold text-dark-text-primary mb-4">Personal Information</h2>
        <div><label className="block text-sm font-medium text-dark-text-secondary mb-1">Tagline</label><input type="text" value={profile.tagline || ''} readOnly className="w-full bg-dark-bg border border-dark-border rounded-md p-2" /></div>
      </div>
      <div className="bg-dark-card border border-dark-border rounded-lg p-6 opacity-60 cursor-not-allowed">
        <h2 className="text-xl font-semibold text-dark-text-primary mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">{Array.isArray(profile.skills) && profile.skills.map(skill => (<span key={skill.name} className="bg-dark-bg text-sm px-3 py-1 rounded-full">{skill.name}</span>))}</div>
      </div>
      <div className="bg-dark-card border border-dark-border rounded-lg p-6 opacity-60 cursor-not-allowed">
         <h2 className="text-xl font-semibold text-dark-text-primary mb-4">Social Media Links</h2>
      </div>

      {/* --- THIS IS THE FULLY FUNCTIONAL RESUME/CV CARD --- */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-dark-text-primary mb-4">Resume/CV</h2>
        <div className="flex items-center gap-4 mb-4">
          <FileText className="text-dark-text-secondary flex-shrink-0" />
          <span className="text-dark-text-primary truncate" title={profile.resume_url || 'No CV uploaded'}>
            {/* Display the new filename if selected, otherwise show the one from the DB */}
            {newCvFile ? newCvFile.name : (profile.resume_url || 'No CV uploaded')}
          </span>
          <label className="ml-auto flex-shrink-0 cursor-pointer bg-dark-bg border border-dark-border text-dark-text-secondary font-semibold text-sm px-4 py-2 rounded-md hover:border-primary">
            Upload New CV
            <input type="file" className="sr-only" onChange={handleCvChange} accept=".pdf,.doc,.docx" />
          </label>
        </div>
        <div className="flex justify-end">
          <button 
            onClick={handleUpdateCv} 
            className="bg-primary text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-primary-hover"
            // The button is only enabled if a new file has been selected
            disabled={!newCvFile} 
          >
            Update CV
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;