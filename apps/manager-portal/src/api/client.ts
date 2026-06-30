import axios from 'axios';

// Ensure the backend URL matches the FastAPI server port
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAppointments = async () => {
  const { data } = await apiClient.get('/appointments/');
  return data;
};
