import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../context/axios";
import { useAuth } from "../../context/AuthContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Code2 } from "lucide-react";

const HistoryNavbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleSignupClick = () => {
    navigate("/register");
  };

  const handleLogoutClick = async () => {
    try {
      await api.post("/user/logout", {});
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 py-4">
      {/* Left - Logo */}
      <div onClick={() => navigate("/")} className="shrink-0">
        <div className="flex cursor-pointer items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5a5f7a]">
            <Code2 className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold font-Noto text-white">
              Doctor<span className="text-violet-500">Code</span> AI
            </h1>

            <p className="text-xs font-Inter text-gray-400">
              AI Code Review & Analyzer
            </p>
          </div>
        </div>
      </div>

      {/* Center - Heading */}
      <h1 className="order-3 w-full text-center text-xl font-bold text-white font-Noto sm:order-0 sm:w-auto sm:text-2xl">
        Review History
      </h1>

      {/* Right - Actions */}
      <div className="flex items-center justify-end gap-3">
        {/* Dark Mode */}
        <button className="rounded-lg border border-gray-700 bg-[#1E293B] p-2.5 text-xl text-white transition hover:bg-[#334155]">
          <MdOutlineDarkMode />
        </button>

        {/* Notification */}
        <button className="relative rounded-lg border border-gray-700 bg-[#1E293B] p-2.5 text-xl text-white transition hover:bg-[#334155]">
          <IoMdNotificationsOutline />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Sign Up / Logout */}
        {user ? (
          <button
            onClick={handleLogoutClick}
            className="rounded-lg px-4 py-2 text-sm font-medium bg-red-600 text-white font-Inter transition hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleSignupClick}
            className="rounded-lg px-4 py-2 text-sm font-medium bg-violet-600 text-white font-Inter transition hover:bg-violet-700"
          >
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default HistoryNavbar;
