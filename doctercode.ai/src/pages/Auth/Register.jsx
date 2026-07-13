import React, { useState } from "react";
import Logo from "../../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import api from "../../context/axios";
import regpic from "../../assets/login.avif";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      const res = await api.post("/user/register", formData);
      toast.success("Account created successfully 🎉");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Register Form */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <div className="mb-6 flex justify-center">
              <Logo />
            </div>

            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
              Create New Account
            </h1>

            {error && (
              <p className="text-red-500 text-center text-sm mb-4">{error}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 rounded-lg bg-indigo-500 py-3 text-white font-medium hover:bg-indigo-600 transition disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-indigo-600 underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative hidden lg:block">
          <img
            src={regpic}
            alt="Register"
            className="h-full w-full object-fit"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
}
