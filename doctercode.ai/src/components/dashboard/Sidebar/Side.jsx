import React from "react";
import Header from "./Header";
import Btn from "./Btn";
import Lang from "./Lang";

const Sidebar = ({ onNewReview }) => {
  return (
    <div className="bg-[#090d15] border-r-2 border-[#5a5f7a] w-full sm:w-64 lg:w-[18vw] min-h-screen  flex flex-col px-4">
      <Header />
      <Btn onNewReview={onNewReview} />
      <Lang />
    </div>
  );
};

export default Sidebar;
