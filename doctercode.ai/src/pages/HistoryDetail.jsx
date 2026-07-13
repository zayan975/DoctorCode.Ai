import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../context/axios";
import { IoArrowBack } from "react-icons/io5";
import {
  FaBug,
  FaShieldHalved,
  FaGaugeHigh,
  FaBookOpen,
  FaCheckDouble,
} from "react-icons/fa6";

const severityBadge = (severity) => {
  const map = {
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };
  return map[severity] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
};

const IssueSection = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-semibold text-white font-Inter uppercase tracking-wide">
        {title} ({items.length})
      </h3>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="rounded-lg border border-[#5a5f7a] bg-[#1E293B] p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-Inter">
                Line {item.line}
              </span>
              <span
                className={`rounded-md border px-2 py-0.5 text-xs font-medium capitalize font-Inter ${severityBadge(
                  item.severity,
                )}`}
              >
                {item.severity}
              </span>
            </div>
            <p className="mb-2 text-sm text-gray-200 font-Inter">
              {item.message}
            </p>
            <p className="text-sm text-green-400 font-Inter">Fix: {item.fix}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const HistoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const scoreConfig = {
    overall: { icon: <FaGaugeHigh />, color: "text-violet-400" },
    security: { icon: <FaShieldHalved />, color: "text-red-400" },
    performance: { icon: <FaBug />, color: "text-orange-400" },
    readability: { icon: <FaBookOpen />, color: "text-blue-400" },
    bestPractices: { icon: <FaCheckDouble />, color: "text-green-400" },
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await api.get(`/reviews/${id}`);
        setReview(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load review.");
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d15] p-6 text-gray-400 font-Inter">
        Loading review...
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="min-h-screen bg-[#090d15] p-6 text-red-400 font-Inter">
        {error || "Review not found."}
      </div>
    );
  }

  const { score, aiResponse } = review;

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewData.optimizedCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#090d15] p-6">
      <button
        onClick={() => navigate("/history")}
        className="mb-6 flex items-center gap-2 px-2 py-2 hover:bg-[#2b3454] rounded-2xl text-lg text-gray-400 transition hover:text-white font-Inter"
      >
        <IoArrowBack /> Back to History
      </button>

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="rounded-md bg-violet-600/20 px-3 py-1  text-lg text-violet-400 font-Inter capitalize">
            {review.language}
          </span>
          <p className="mt-2 text-xs text-gray-500 font-Inter">
            Reviewed on{" "}
            {new Date(review.createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>

      {/* Score Cards */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Object.entries(score).map(([key, value]) => (
          <div
            key={key}
            className="rounded-xl border border-[#5a5f7a] bg-[#1E293B] p-4 text-center"
          >
            <div
              className={`mb-2 flex justify-center text-xl ${scoreConfig[key]?.color || "text-gray-400"}`}
            >
              {scoreConfig[key]?.icon || <FaGaugeHigh />}
            </div>
            <p className="text-2xl font-bold text-white font-Noto">{value}</p>
            <p className="mt-1 text-xs capitalize text-gray-400 font-Inter">
              {key}
            </p>
          </div>
        ))}
      </div>

      {/* Code Comparison */}
      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-white font-Inter">
            Original Code
          </h3>
          <pre className="hide-scrollbar overflow-auto rounded-xl border border-[#5a5f7a] bg-[#0d1420] p-4 text-xs text-gray-300 font-mono max-h-80">
            {review.originalCode}
          </pre>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-white font-Inter">
            Optimized Code
          </h3>
          <div className="relative">
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 flex cursor-pointer items-center gap-1.5 px-3 py-1.5 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/30 text-zinc-400 hover:text-zinc-200 rounded-lg text-xs font-medium transition-all duration-200 active:scale-95 bg-[#0d1420]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              {copied ? "Copied!" : "Copy Code"}
            </button>

            <pre className="hide-scrollbar overflow-auto rounded-xl border border-green-500/30 bg-[#0d1420] p-4 text-xs text-green-300 font-mono max-h-80">
              {review.optimizedCode}
            </pre>
          </div>
        </div>
      </div>

      {/* Explanation */}
      {aiResponse?.explanation && (
        <div className="mb-8 rounded-xl border border-[#5a5f7a] bg-[#1E293B] p-4">
          <h3 className="mb-2 text-sm font-semibold text-white font-Inter">
            Explanation
          </h3>
          <p className="text-sm leading-relaxed text-gray-300 font-Inter">
            {aiResponse.explanation}
          </p>
        </div>
      )}

      {/* Issues */}
      <IssueSection title="Bugs" items={aiResponse?.bugs} />
      <IssueSection title="Security" items={aiResponse?.security} />
      <IssueSection title="Performance" items={aiResponse?.performance} />
      <IssueSection title="Best Practices" items={aiResponse?.bestPractices} />
    </div>
  );
};

export default HistoryDetail;
