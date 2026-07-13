import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../context/axios";
import { FaCode } from "react-icons/fa6";
import Logo from "../components/Logo";
import HistoryNavbar from "../components/dashboard/HistoryNavbar";

const severityColor = (score) => {
  if (score >= 70) return "text-green-400 border-green-400/30 bg-green-400/10";
  if (score >= 40)
    return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
  return "text-red-400 border-red-400/30 bg-red-400/10";
};

const History = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/reviews");
        setReviews(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load history.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-[#090d15] p-4 sm:p-6">
      <HistoryNavbar />
      {loading && (
        <p className="text-gray-400 font-Inter text-sm">Loading history...</p>
      )}

      {error && <p className="text-red-400 font-Inter text-sm">{error}</p>}

      {!loading && !error && reviews.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-gray-400 font-Inter text-center px-4">
          <FaCode size={36} className="mb-3 opacity-50" />
          <p className="text-sm sm:text-base">
            No reviews yet. Start by reviewing some code!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            onClick={() => navigate(`/history/${review._id}`)}
            className="
            cursor-pointer rounded-xl border border-[#5a5f7a]
            bg-[#1E293B] p-3 sm:p-4 transition
            hover:border-violet-500 hover:bg-[#242f45]
          "
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="rounded-md bg-violet-600/20 px-2 py-1 text-xs font-medium text-violet-400 font-Inter capitalize">
                {review.language}
              </span>
              <span
                className={`rounded-md border px-2 py-1 text-xs font-medium font-Inter ${severityColor(
                  review.score?.overall,
                )}`}
              >
                Score: {review.score?.overall ?? "N/A"}
              </span>
            </div>

            <pre className="hide-scrollbar mb-3 h-14 sm:h-16 overflow-hidden rounded-lg bg-[#0d1420] p-2 text-xs text-gray-400 font-mono break-all whitespace-pre-wrap">
              {review.originalCode?.slice(0, 120)}...
            </pre>

            <div className="flex flex-wrap items-center justify-between gap-1 text-xs text-gray-500 font-Inter">
              <span className="capitalize">{review.status}</span>
              <span>
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
