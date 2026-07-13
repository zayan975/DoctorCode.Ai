import React from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiOpenjdk,
  SiCplusplus,
  SiSharp,
  SiPhp,
  SiLaravel,
  SiRuby,
  SiGo,
} from "react-icons/si";
import { MdExpandMore } from "react-icons/md";

const Lang = () => {
  const languages = [
    { icon: <SiJavascript className="text-yellow-400" />, name: "JavaScript" },
    { icon: <SiTypescript className="text-blue-500" />, name: "TypeScript" },
    { icon: <SiReact className="text-cyan-400" />, name: "React.js" },
    { icon: <SiNextdotjs className="text-white" />, name: "Next.js" },
    { icon: <SiNodedotjs className="text-green-500" />, name: "Node.js" },
    { icon: <SiExpress className="text-gray-300" />, name: "Express" },
    { icon: <SiPython className="text-yellow-500" />, name: "Python" },
    { icon: <SiOpenjdk className="text-red-500" />, name: "Java" },
    { icon: <SiCplusplus className="text-blue-500" />, name: "C++" },
    { icon: <SiSharp className="text-purple-500" />, name: "C#" },
    { icon: <SiPhp className="text-indigo-400" />, name: "PHP" },
    { icon: <SiLaravel className="text-red-500" />, name: "Laravel" },
    { icon: <SiRuby className="text-red-600" />, name: "Ruby" },
    { icon: <SiGo className="text-cyan-400" />, name: "Go" },
  ];

  return (
    <div className="mt-4 border-t-2 border-[#5a5f7a] pt-4">
      <h1 className="mb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        Languages
      </h1>

      <div className="flex flex-col gap-1">
        {languages.map((lang, index) => (
          <button
            key={index}
            className="flex items-center gap-3 rounded-lg font-Noto px-3 py-2 text-gray-300 transition-all hover:bg-[#2b3454] hover:text-white"
          >
            <span className="text-lg">{lang.icon}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
      <button className="flex w-full items-center gap-2 rounded-lg font-Inter text-sm mt-3 text-gray-400 transition-all  hover:text-white">
        <MdExpandMore className="text-lg" />
        <span>More coming soon...</span>
      </button>
    </div>
  );
};

export default Lang;
