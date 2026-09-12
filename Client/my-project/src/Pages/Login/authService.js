import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (userData) => {
  return await axios.post(
    `${API_URL}/user/login`,
    userData
  );
};

export const getCurrentUser = async (token) => {
  return await axios.get(
    `${API_URL}/user/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/user/register`,
    userData
  );

  return response;
};