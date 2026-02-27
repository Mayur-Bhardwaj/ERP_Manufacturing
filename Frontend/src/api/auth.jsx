// src/api/auth.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

// REGISTER
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data; // sends the error message from backend
  }
};

// LOGIN
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
