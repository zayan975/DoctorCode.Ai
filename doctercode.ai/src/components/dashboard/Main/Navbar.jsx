import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiChevronDown } from "react-icons/hi";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../context/axios";

const Navbar = () => {
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
    <div className=" py-4">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-Noto text-white sm:text-3xl">
            New Code Review
          </h1>
          <p className="mt-2 font-Inter max-w-2xl text-sm leading-6 text-gray-300 sm:text-sm">
            Paste your code and let AI analyze it for bugs, security issues and
            performance improvements.
          </p>
        </div>

        {/* Right */}
        <div className="flex w-full flex-wrap items-center justify-start gap-3 sm:w-auto sm:justify-end">
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
    </div>
  );
};

export default Navbar;
