import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200">
      
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[400px]">
        
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-2">
          SheVerse
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Women Safety System
        </p>

        <form onSubmit={handleSubmit}>
          
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 p-3 mb-5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button className="bg-pink-600 hover:bg-pink-700 transition duration-300 text-white py-3 w-full rounded-lg font-semibold">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          New user?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-pink-600 font-semibold cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
