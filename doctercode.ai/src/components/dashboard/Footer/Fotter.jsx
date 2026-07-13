import React, { useState } from "react";

const AIReviewComponent = ({ data }) => {
  if (!data) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-400">
        No review available
      </div>
    );
  }
  const reviewData = {
    explanation: data.aiResponse.explanation,
    optimizedCode: data.optimizedCode,
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewData.optimizedCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full  bg-[#090d15] flex items-center justify-center p-6 text-slate-300 font-sans">
      <div className="grid grid-cols-1  md:grid-cols-2 gap-4 max-w-6xl w-full">
        {/* AI Explanation */}
        <div className="bg-[#0f0f13] border  border-b-2 border-[#5a5f7a]  h-70 overflow-hidden overflow-y-auto hide-scrollbar rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z" />
                <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
              </svg>
              <h3 className="text-[15px] font-semibold font-Inter text-zinc-100 tracking-wide">
                AI Explanation
              </h3>
            </div>
            <div className="space-y-4 border-2 font-Noto border-t-[#5a5f7a] p-4 rounded-2xl  text-[13.5px] leading-relaxed text-zinc-400">
              <p>{reviewData.explanation}</p>
            </div>
          </div>
        </div>

        {/* Optimized Code */}
        <div className="bg-[#0f0f13] border h-70 border-b-2 border-[#5a5f7a]   hide-scrollbar   rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between border-b-2  border-[#5a5f7a] pb-2 mb-2">
            <div className="flex items-center gap-3 font-Inter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              <h3 className="text-[15px] font-semibold text-zinc-100 tracking-wide">
                Optimized Code{" "}
                <span className="text-xs font-normal text-zinc-500 ml-1">
                  (Preview)
                </span>
              </h3>
            </div>
            <button
              onClick={handleCopy}
              className="flex cursor-pointer items-center gap-1.5 px-3 py-1.5 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/30 text-zinc-400 hover:text-zinc-200 rounded-lg text-xs font-medium transition-all duration-200 active:scale-95"
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
          </div>

          {/* Code Blocks / Syntax Highlighted Container */}
          <div className="font-mono text-[13.5px] hide-scrollbar leading-6 overflow-x-auto bg-green-500/10 selection:bg-purple-500/30 border border-green-900/30 rounded-xl">
            <pre className="overflow-auto whitespace-pre-wrap font-mono p-2 text-sm">
              <code>{reviewData.optimizedCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIReviewComponent;
