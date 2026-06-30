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

export const fetchServices = async () => {
  const { data } = await apiClient.get('/services/');
  return data;
};

export const fetchBarbers = async () => {
  const { data } = await apiClient.get('/barbers/');
  return data;
};

export const createAppointment = async (apptData: any) => {
  const { data } = await apiClient.post('/appointments/', apptData);
  return data;
};

export const fetchBarberQueue = async (barberId: string) => {
  const { data } = await apiClient.get(`/barbers/${barberId}/queue`);
  return data;
};
