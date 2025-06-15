import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BACK_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function login() {
  await api.get('/auth/google');
}