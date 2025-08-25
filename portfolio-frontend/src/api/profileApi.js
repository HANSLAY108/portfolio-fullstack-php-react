// src/api/profileApi.js
import axios from 'axios';
import { API_BASE_URL } from '../config';

const PROFILE_API_URL = `${API_BASE_URL}/profile.php`;

export const getProfile = async () => {
  const response = await axios.get(PROFILE_API_URL);
  return response.data;
};

// This function now saves all text-based data including skills and links
export const updateProfileData = async (profileData) => {
  const formData = new FormData();
  formData.append('action', 'update_text_and_links');
  formData.append('tagline', profileData.tagline);
  formData.append('biography', profileData.biography);
  formData.append('skills', JSON.stringify(profileData.skills));
  formData.append('social_links', JSON.stringify(profileData.socialLinks));

  const response = await axios.post(PROFILE_API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateCv = async (cvFile) => {
  const formData = new FormData();
  formData.append('action', 'update_cv');
  formData.append('resume', cvFile);
  
  const response = await axios.post(PROFILE_API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};