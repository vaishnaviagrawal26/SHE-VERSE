import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const getEvidence = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE_URL}/legal/evidence`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const uploadEvidence = async (file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${API_BASE_URL}/legal/evidence/upload`, formData, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getHelplines = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE_URL}/legal/helplines`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};