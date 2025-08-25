import axios from 'axios';
import { API_BASE_URL } from '../config';

const PROJECTS_API_URL = `${API_BASE_URL}/projects.php`;

// GET: Fetches all projects from the database
export const getProjects = async () => {
  const response = await axios.get(PROJECTS_API_URL);
  return response.data;
};

// --- THIS IS THE MISSING FUNCTION ---
// GET: Fetches a single project by its unique ID (for the edit form)
export const getProjectById = async (id) => {
  const response = await axios.get(`${PROJECTS_API_URL}?id=${id}`);
  return response.data;
};
// ------------------------------------

// GET: Fetches a single project by its unique slug
export const getProjectBySlug = async (slug) => {
  const response = await axios.get(`${PROJECTS_API_URL}?slug=${slug}`);
  return response.data;
};

// POST: Adds a new project to the database
export const addProject = async (formData) => {
  const response = await axios.post(PROJECTS_API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// POST: Updates an existing project
export const updateProject = async (projectId, formData) => {
  formData.append('id', projectId);
  const response = await axios.post(PROJECTS_API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// DELETE: Removes a project from the database
export const deleteProject = async (projectId) => {
  const response = await axios.delete(PROJECTS_API_URL, {
    data: { id: projectId }
  });
  return response.data;
};