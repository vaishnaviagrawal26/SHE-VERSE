import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:8000";
const token = localStorage.getItem("token");

export const getTrustedContacts = async () => {
  const res = await axios.get(`${API_BASE_URL}/trusted_contacts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addTrustedContact = async (contact) => {
  const res = await axios.post(`${API_BASE_URL}/trusted_contacts`, contact, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const removeTrustedContact = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/trusted_contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};