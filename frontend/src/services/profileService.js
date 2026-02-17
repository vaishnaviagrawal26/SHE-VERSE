import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:8000";
const token = localStorage.getItem("token");

export const getProfile = async () => {
  const res = await axios.get(`${API_BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await axios.put(`${API_BASE_URL}/profile`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const setTriggerPhrase = async (phrase) => {
  const res = await axios.post(`${API_BASE_URL}/profile/trigger_phrase`, { phrase }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};