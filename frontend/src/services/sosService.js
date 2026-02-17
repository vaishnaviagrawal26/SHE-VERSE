import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ FIXED
});

// 🔴 Trigger SOS
export const triggerSOS = async () => {
  const res = await axios.post(
    `${API_BASE_URL}/sos/trigger`,
    { message: "Emergency SOS triggered" },
    { headers: getAuthHeaders() }
  );
  return res.data;
};

// 🔴 Update location
export const updateSOSLocation = async (sosId, location) => {
  await axios.post(
    `${API_BASE_URL}/sos/${sosId}/location`,
    location,
    { headers: getAuthHeaders() }
  );
};

// 🔴 Upload audio
export const uploadAudioEvidence = async (sosId, blob) => {
  const formData = new FormData();
  formData.append("audio", blob);

  await axios.post(
    `${API_BASE_URL}/sos/${sosId}/upload-audio`,
    formData,
    {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// 🔴 Fetch stats
export const fetchUserStats = async () => {
  const res = await axios.get(`${API_BASE_URL}/sos/stats`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
