import React from "react";
import { Code2 } from "lucide-react";

const Header = () => {
  return (
    <div className="flex h-20 items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5a5f7a]">
          <Code2 className="h-5 w-5 text-white" />
        </div>

        <div>
          <h1 className="text-lg font-bold font-Noto text-white">
            Doctor<span className="text-violet-500">Code</span> AI
          </h1>

          <p className="text-xs font-Inter text-gray-400">
            AI Code Review & Analyzer
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;