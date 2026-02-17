import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";
const token = localStorage.getItem("token");

export const getPosts = async () => {
  const res = await axios.get(`${API_BASE_URL}/forum`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createPost = async (content) => {
  const res = await axios.post(
    `${API_BASE_URL}/forum`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const votePoll = async (pollId, optionId) => {
  const res = await axios.post(
    `${API_BASE_URL}/forum/poll/${pollId}/vote`,
    { option_id: optionId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};