import axios from 'axios';

const BASE = 'http://localhost:5000/api';

export const loginUser = (data) => axios.post(`${BASE}/login`, data);
export const logoutUser = (token) =>
    axios.post(`${BASE}/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });