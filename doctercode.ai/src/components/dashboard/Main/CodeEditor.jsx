import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { createReview } from "../../../context/reviewApi";

function CodeEditor({ onReviewComplete }) {
  const [code, setCode] = useState("");
  const [cursorPos, setCursorPos] = useState({ line: 0, col: 0 });
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const editorRef = useRef(null);

  const languages = [
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Python", value: "python" },
    { label: "React.js", value: "react" },
    { label: "Next.js", value: "nextjs" },
    { label: "Express.js", value: "express" },
    { label: "Node.js", value: "nodejs" },
    { label: "Java", value: "java" },
    { label: "PHP", value: "php" },
    { label: "Laravel", value: "laravel" },
    { label: "C++", value: "cpp" },
    { label: "C", value: "csharp" },
    { label: "Go", value: "go" },
  ];

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.onDidChangeCursorPosition((e) => {
      setCursorPos({ line: e.position.lineNumber, col: e.position.column });
    });
  };

  const handleReviewClick = async () => {
    if (!code.trim()) {
      setError("Please write some code first!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await createReview({ code, language });
      console.log("Review result:", res.data);
      onReviewComplete(res.data.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Review failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-800 bg-[#]">
      {/* Language Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#252526] border-b border-gray-800 px-3 py-2">
        {/* Left Side */}
        <div className="flex items-center gap-2 text-gray-400">
          <button className="hover:text-white text-xs">⤢</button>
          <button className="hover:text-white text-xs">⛶</button>
        </div>

        {/* Right Side */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-md bg-[#5a5f7a] font-Inter px-2  py-2 text-sm text-gray-300 transition-all hover:bg-[#2b3454] hover:text-white outline-none"
        >
          {languages.map((lang) => (
            <option
              className="[#1e1e1e] text-white"
              key={lang.value}
              value={lang.value}
            >
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="510px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12 },
          lineNumbersMinChars: 3,
        }}
      />

      {error && (
        <div className="absolute left-4 right-7 bottom-14 z-10 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between bg-[#252526] border-t border-gray-800  px-4 py-2 text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span>
            Ln {cursorPos.line}, Col {cursorPos.col}
          </span>
          <span>Spaces: 4</span>
          <span>UTF-8</span>
          <span className="text-yellow-400">
            ● {languages.find((l) => l.value === language)?.label}
          </span>
        </div>

        <button
          onClick={handleReviewClick}
          disabled={loading}
          className="flex items-center gap-2  bg-violet-600  text-white transition hover:bg-violet-700 px-4 py-1.5 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>✦</span> {loading ? "Reviewing..." : "Review Code"}
        </button>
      </div>
    </div>
  );
}

export default CodeEditor;
