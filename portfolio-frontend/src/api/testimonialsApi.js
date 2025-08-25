// src/api/testimonialsApi.js
import axios from 'axios';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/testimonials.php`;

// [Admin] Generate a new unique link for a client
export const generateTestimonialLink = async () => {
  const response = await axios.post(`${API_URL}?action=generate_link`);
  return response.data;
};

// [Admin] Get all submitted testimonials for review
export const getAllTestimonials = async () => {
  const response = await axios.get(`${API_URL}?action=get_all`);
  return response.data;
};

// [Admin] Update the status of a testimonial (e.g., 'Approved', 'Rejected')
export const updateTestimonialStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}?action=update_status`, { id, status });
  return response.data;
};

// [Public] Get only the approved testimonials for the homepage
export const getApprovedTestimonials = async () => {
  const response = await axios.get(`${API_URL}?action=get_approved`);
  return response.data;
};

// --- NEW FUNCTIONS ---

// [Public] Validate a token before showing the submission form
export const validateTestimonialToken = async (token) => {
  const response = await axios.get(`${API_URL}?action=validate_token&token=${token}`);
  return response.data;
};

// [Public] Submit a new testimonial from the client form
export const submitTestimonial = async (testimonialData) => {
  // We send the full data object, including the token
  const response = await axios.post(`${API_URL}?action=submit`, testimonialData);
  return response.data;
};