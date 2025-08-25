// src/api/messagesApi.js
import axios from 'axios';
import { API_BASE_URL } from '../config';

const MESSAGES_API_URL = `${API_BASE_URL}/messages.php`;

// Send a new message from the public contact form
export const sendMessage = async (messageData) => {
  const response = await axios.post(MESSAGES_API_URL, messageData);
  return response.data;
};

// Get all messages for the admin panel
export const getMessages = async () => {
  const response = await axios.get(MESSAGES_API_URL);
  return response.data;
};

// Update a message's status
export const updateMessageStatus = async (id, status) => {
  const response = await axios.put(MESSAGES_API_URL, { id, status });
  return response.data;
};

// Delete a message
export const deleteMessage = async (id) => {
  const response = await axios.delete(MESSAGES_API_URL, { data: { id } });
  return response.data;
};