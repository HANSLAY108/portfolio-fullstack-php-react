// src/api/dashboardApi.js
import axios from 'axios';
import { API_BASE_URL } from '../config';

const DASHBOARD_API_URL = `${API_BASE_URL}/dashboard.php`;

/**
 * Fetches all the data needed for the admin dashboard overview.
 */
export const getDashboardData = async () => {
  const response = await axios.get(DASHBOARD_API_URL);
  return response.data;
};