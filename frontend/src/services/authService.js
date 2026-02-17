import axiosInstance from "./axiosInstance";

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Login failed";
  }
};

export const signupUser = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Signup failed";
  }
};
