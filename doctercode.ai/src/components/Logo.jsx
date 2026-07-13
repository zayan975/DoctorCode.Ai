import { Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="flex flex-col items-center gap-4"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
        <Code2 className="h-8 w-8 text-violet-600" />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Doctor<span className="text-violet-600">Code</span> AI
        </h1>
        <p className="mt-1 text-gray-500">AI Code Review & Analyzer</p>
      </div>
    </div>
  );
};

export default Logo;
