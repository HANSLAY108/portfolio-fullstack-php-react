// src/api/settingsApi.js
import axios from 'axios';
import { API_BASE_URL } from '../config';

const SETTINGS_API_URL = `${API_BASE_URL}/settings.php`;

export const getSettings = () => axios.get(SETTINGS_API_URL);

export const updateLogo = (formData) => axios.post(`${SETTINGS_API_URL}?action=update_logo`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const updateTheme = (accentColor) => axios.post(`${SETTINGS_API_URL}?action=update_theme`, { accentColor });

export const updateContactDetails = (contactData) => axios.post(`${SETTINGS_API_URL}?action=update_contact`, contactData);