import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import OutputShow from "./OutputShow";
import Fotter from "../Footer/Fotter";

const Center = () => {
  const [reviewData, setReviewData] = useState(null);

  return (
    <div className="w-full">
      <div
        className=" flex flex-col lg:flex-row gap-2 p-2 min-h-screen border-2 border-[#5a5f7a] bg-[#090d15] rounded-xl " >
        {/* Left - Code Editor */}
        <div className="w-full lg:w-[45%] h-112.5 lg:h-screen overflow-hidden rounded-xl">
          <CodeEditor onReviewComplete={setReviewData} />
        </div>

        {/* Right - Output */}
        <div className="w-full lg:flex-1 h-112.5 bg-gray-800 border-[#5a5f7a] border lg:h-screen overflow-hidden rounded-xl">
          <OutputShow data={reviewData} />
        </div>
      </div>
      {/* Footer */}
      <Fotter data={reviewData} />
    </div>
  );
};

export default Center;
