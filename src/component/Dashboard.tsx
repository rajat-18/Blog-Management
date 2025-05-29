import { useEffect, useState } from "react";
import { BASE_URL } from "../constant/constant";
import BlogApp from "./Blog";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<string | null>(null);
  const getToken = async () => {
    const storedToken = localStorage.getItem("token");
    const storedProfile = localStorage.getItem("profile");
    if (storedToken || storedProfile) {
      // setToken(storedToken);
      setProfile(storedProfile);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between w-full p-4 bg-white shadow-md">
        {/* Heading at Center */}
        <h1 className="text-2xl font-bold text-red-700 flex-1 text-center uppercase">
          User Dashboard
        </h1>

        {/* Logo at Right */}
        <div className="w-1/4 flex justify-end">
          <img
            src={`${BASE_URL}/uploads/${profile}`}
            alt="Profile Image"
            className="w-24 h-10 "
          />
        </div>
        <button
          className="flex items-center gap-5  text-black p-2 rounded"
          onClick={() => {
            localStorage.clear(); 
            navigate("/"); 
          }}
        >
          <HiOutlineLogout size={28} className="w-20" />
        </button>
      </div>
      <BlogApp />
    </>
  );
};

export default Dashboard;
