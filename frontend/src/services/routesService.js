import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:8000";
const token = localStorage.getItem("token");

export const getSaferRoutes = async (location) => {
  const res = await axios.post(
    `${API_BASE_URL}/routes/safer`,
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};