import React, { useState } from "react";
import All from "../components/dashboard/Main/All";
import Side from "../components/dashboard/Sidebar/Side";

const Dashboard = () => {
  const [reviewKey, setReviewKey] = useState(0);

  const handleNewReview = () => {
    setReviewKey((prev) => prev + 1);
  };

  return (
    <div className="bg-[#090d15] h-full flex ">
      <Side onNewReview={handleNewReview} />
      <All key={reviewKey} />
    </div>
  );
};

export default Dashboard;
