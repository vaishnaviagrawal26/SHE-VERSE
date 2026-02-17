import { createContext, useState, useEffect } from "react";
import { loginUser, signupUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = async (data) => {
    // If called from Login page → data = form
    // If called from Signup → data already contains token
    let response = data;

    if (!data.access_token) {
      response = await loginUser(data);
    }

    setUser(response.user);
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("token", response.access_token);
  };

  // SIGNUP (optional direct use)
  const signup = async (data) => {
    const response = await signupUser(data);

    setUser(response.user);
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("token", response.access_token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
