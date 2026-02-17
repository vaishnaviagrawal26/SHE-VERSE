import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:8000";
const token = localStorage.getItem("token");

export const sendAIQuery = async (query) => {
  const res = await axios.post(
    `${API_BASE_URL}/ai/query`,
    { query },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data; // expected: { reply: "..." }
};