import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant/constant";
import image from "../assets/logo 1.png";
import { useNavigate } from "react-router-dom";

const SimpleForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        setError("Only JPG, JPEG, and PNG formats are allowed.");
        setProfileImage(null);
        return;
      }

      if (file.size > maxSize) {
        setError("File size must be less than 2MB.");
        setProfileImage(null);
        return;
      }

      setError("");
      setProfileImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password || !profileImage) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImage", profileImage);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && response.data.message === "User registered successfully.") {
        alert("User registered successfully!");
        navigate("/");
        setEmail("");
        setPassword("");
        setProfileImage(null);
        setError("");
      } else {
        setError("Server Error");
      }
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response?.data?.message === "Email already registered.") {
        alert("Email Already Registered.");
      }
      setError("Error registering user");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-sm mx-auto p-4 rounded-lg shadow bg-white">
        <img src={image} alt="Logo" className="mx-auto" />

        <h2 className="text-xl font-bold text-center my-3 text-red-600">
          New Here? Sign Up Now!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Enter The Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Enter The Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          <button type="submit" className="w-full bg-[#1D56A5] text-white p-2 rounded" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-right text-sm">
            Already Registered?{" "}
            <span
              className="font-semibold text-[#1D56A5] cursor-pointer hover:text-red-600"
              onClick={() => navigate("/")}
            >
              Please Login First.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleForm;
