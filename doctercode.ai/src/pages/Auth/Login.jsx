import React, { useState } from "react";
import Logo from "../../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import api from "../../context/axios";
import loginpic from "../../assets/login.avif";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/user/login", formData);
      setUser(res.data.user);
      toast.success("Login successful 🎉");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Form */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md text-gray-500 text-sm">
            <h2 className="mb-6">
              <Logo />
            </h2>

            {error && (
              <p className="text-red-500 text-center text-xs mb-3">{error}</p>
            )}

            <form onSubmit={handleSubmit}>
              <input
                id="email"
                className="w-full bg-transparent border my-3 border-gray-300 outline-none rounded-full py-3 px-4"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                id="password"
                className="w-full bg-transparent border mt-1 border-gray-300 outline-none rounded-full py-3 px-4"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div className="text-right py-4">
                <a href="#" className="text-blue-600 underline">
                  Forgot Password
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-500 hover:bg-indigo-600 py-3 rounded-full text-white transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p className="text-center mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-indigo-600 underline"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block relative">
          <img
            src={loginpic}
            alt="Login"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
}
