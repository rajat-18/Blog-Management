import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../constant/constant";
import logo from "../assets/logo 1.png";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post<{
        token: string;
        profile: string;
        id: string;
      }>(`${BASE_URL}/api/v1/login`, formData);

      toast.success("Login successful! 🎉");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("profile", response.data.profile);
      localStorage.setItem("id", response.data.id);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error logging in user");
      toast.error("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
       <img src={logo} alt="Logo" style={{ width: '60px', height: 'auto' }} />
        <h2 className="text-xl font-bold text-center my-3 text-red-600">
          Let's Get You Signed In!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-black">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white font-semibold rounded-sm ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#1D56A5] hover:bg-[#1D56A5]"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <div
            className="text-right p-2 text-sm cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Welcome! New Users,{" "}
            <span className="font-semibold text-[#1D56A5] hover:text-red-600">
              Please Register First.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
