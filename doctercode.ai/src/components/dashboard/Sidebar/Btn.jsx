import React from "react";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineDashboardCustomize, MdHistory } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Btn = ({ onNewReview }) => {
  const navigate = useNavigate();
  const buttons = [
    { icon: <MdOutlineDashboardCustomize size={20} />, name: "Dashboard" },
    { icon: <MdHistory size={20} />, name: "History" },
    { icon: <CiSettings size={20} />, name: "Settings" },
  ];

  const handleHistory = () => {
    navigate("/history");
  };

  return (
    <div className="mt-6">
      <button
        onClick={onNewReview}
        className="
          flex w-full items-center justify-center gap-2
          rounded-xl bg-violet-600 py-3
          text-white font-medium
          transition hover:bg-violet-700
        "
      >
        <FaPlus />
        <span>New Review</span>
      </button>

      {/* Menu */}
      <div className="mt-5 flex flex-col gap-2">
        {buttons.map((button, index) => (
          <button
            onClick={handleHistory}
            key={index}
            className="
              flex w-full items-center gap-3
              rounded-lg px-4 py-2
              text-gray-300
              transition-all duration-200
              hover:bg-[#2b3454]
              hover:text-white
              font-Inter
            "
          >
            {button.icon}
            <span>{button.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Btn;
