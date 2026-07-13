import { useState } from "react";
import { Bug, ShieldAlert, Zap, CheckCircle2, Info, X, Check, Languages,} from "lucide-react";

const TAG_STYLES = {
  bug: "bg-red-500/15 text-red-400",
  security: "bg-orange-500/15 text-orange-400",
  performance: "bg-yellow-500/15 text-yellow-400",
  bestPractice: "bg-green-500/15 text-green-400",
};

const DOT_STYLES = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
};

function ScoreGauge({ score }) {
  const radius = 26;
  const circumference = Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center">
      <svg width="72" height="42" viewBox="0 0 72 42">
        <path
          d="M 8 38 A 26 26 0 0 1 64 38"
          fill="none"
          stroke="#2a2d3a"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 8 38 A 26 26 0 0 1 64 38"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute top-4 text-sm font-semibold text-white">
        {score}
      </span>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 bg-[#181b24] border border-gray-800 rounded-xl px-4 py-3 flex-1 min-w-0">
      <div className={`p-2 rounded-lg ${color.bg} shrink-0`}>
        <Icon size={18} className={color.text} />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-gray-400 truncate">{label}</div>
        <div className="text-lg font-semibold text-white">{value}</div>
      </div>
    </div>
  );
}

function IssueCard({ issue }) {
  return (
    <div className="border-b border-gray-800 py-3 last:border-b-0">
      <div className="flex items-start gap-2 min-w-0">
        <span
          className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${DOT_STYLES[issue.dot]}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-100 wrap-break-words">
              {issue.title}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${TAG_STYLES[issue.tagColor]}`}
            >
              {issue.tag}
            </span>
            <span className="text-[10px] text-gray-500 shrink-0">
              Line {issue.line}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1 wrap-break-words">
            {issue.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AIReviewResults({ data }) {
  if (!data) {
    return (
      <div className="flex justify-center font-Inter items-center h-full text-gray-200">
        Paste Your Code. Get AI-Powered Fixes in Seconds
      </div>
    );
  }
  const reviewData = {
    completedIn: "10s",

    overallScore: data.score.overall,

    stats: {
      bugs: data.aiResponse.bugs.length,
      security: data.aiResponse.security.length,
      performance: data.aiResponse.performance.length,
      bestPractices: data.aiResponse.bestPractices.length,
    },

    issues: [
      ...data.aiResponse.bugs.map((item, index) => ({
        id: `bug-${index}`,
        title: item.message,
        tag: "Bug",
        tagColor: "bug",
        description: item.fix,
        line: item.line,
        dot: "red",
        severity: item.severity,
      })),

      ...data.aiResponse.security.map((item, index) => ({
        id: `security-${index}`,
        title: item.message,
        tag: "Security",
        tagColor: "security",
        description: item.fix,
        line: item.line,
        dot: "orange",
        severity: item.severity,
      })),

      ...data.aiResponse.performance.map((item, index) => ({
        id: `performance-${index}`,
        title: item.message,
        tag: "Performance",
        tagColor: "performance",
        description: item.fix,
        line: item.line,
        dot: "yellow",
        severity: item.severity,
      })),

      ...data.aiResponse.bestPractices.map((item, index) => ({
        id: `bp-${index}`,
        title: item.message,
        tag: "Best Practice",
        tagColor: "bestPractice",
        description: item.fix,
        line: item.line,
        dot: "green",
        severity: item.severity,
      })),
    ],

    suggestedFix: {
      original: data.originalCode,
      improved: data.optimizedCode,
    },

    explanation: data.aiResponse.explanation,
  };
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "bugs", label: `Bugs ${reviewData.stats.bugs}` },
    { key: "security", label: `Security ${reviewData.stats.security}` },
    {
      key: "performance",
      label: `Performance ${reviewData.stats.performance}`,
    },
    {
      key: "bestPractices",
      label: `Best Practices ${reviewData.stats.bestPractices}`,
    },
  ];

  const filteredIssues =
    activeTab === "overview"
      ? reviewData.issues
      : reviewData.issues.filter((i) => {
          const map = {
            bugs: "Bug",
            security: "Security",
            performance: "Performance",
            bestPractices: "Best Practice",
          };

          return i.tag === map[activeTab];
        });

  return (
    <div className="w-full bg-[#12141c] rounded-xl lg:rounded-2xl border border-gray-800 overflow-hidden text-gray-100">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-md bg-indigo-500/20 flex items-center justify-center shrink-0">
            <span className="text-indigo-400 text-sm">✦</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-Noto font-semibold truncate">
                AI Review Results
              </h2>
            </div>
            <p className="text-xs text-gray-500 truncate">
              Completed in {reviewData.completedIn}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <ScoreGauge score={reviewData.overallScore} />
          <div className="text-right">
            <div className="text-xs font-Noto text-[#5a5f7a]">
              Overall Score
            </div>
            <div className="text-md font-semibold text-white">
              {reviewData.overallScore}/100
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-4 md:px-6 py-4">
        <StatCard
          icon={Bug}
          label="Bugs"
          value={reviewData.stats.bugs}
          color={{ bg: "bg-red-500/15", text: "text-red-400" }}
        />
        <StatCard
          icon={ShieldAlert}
          label="Security"
          value={reviewData.stats.security}
          color={{ bg: "bg-orange-500/15", text: "text-orange-400" }}
        />
        <StatCard
          icon={Zap}
          label="Performance"
          value={reviewData.stats.performance}
          color={{ bg: "bg-yellow-500/15", text: "text-yellow-400" }}
        />
        <StatCard
          icon={CheckCircle2}
          label="Best Practices"
          value={reviewData.stats.bestPractices}
          color={{ bg: "bg-green-500/15", text: "text-green-400" }}
        />
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto whitespace-nowrap gap-4 px-4 md:px-6 border-b border-gray-800 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 text-xs font-medium py-2.5 border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Body: Issues list + Suggested Fix */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 border-t border-gray-800">
        {/* Left Panel */}
        <div className="min-w-0 h-70 sm:h-87.5 md:h-112.5 lg:h-150 overflow-y-auto hide-scrollbar overflow-x-hidden border-b lg:border-b-0 lg:border-r border-gray-800 px-4 sm:px-6 py-4">
          {filteredIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>

        {/* Right Panel */}
        <div className="min-w-0 flex h-full lg:h-97.5  flex-col px-4  sm:px-3 py-2">
          {/* Header */}
          <div className="flex items-center hide-scrollbar overflow-y-hidden gap-2 mb-3 shrink-0">
            <span className="text-indigo-400">✦</span>
            <h3 className="text-sm font-semibold font-Noto text-white">
              Suggested Fix (AI)
            </h3>
          </div>

          {/* Scroll Area */}
          <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar space-y-4 pr-1">
            {/* Original */}
            <div className="min-w-0  w-full rounded-xl border border-red-900/40 overflow-hidden bg-[#151821]">
              <div className="flex items-center justify-between px-3 py-2 bg-red-500/10 border-b border-red-900/30">
                <span className="text-xs font-medium text-red-400">
                  − Original
                </span>
              </div>

              <pre className="min-w-0 w-full max-h-40 sm:max-h-52 md:max-h-40 overflow-auto p-3 sm:p-4 text-[11px] sm:text-xs leading-6 font-mono whitespace-pre-wrap break-all">
                {reviewData.suggestedFix.original}
              </pre>
            </div>

            {/* Improved */}
            <div className="min-w-0 w-full rounded-xl border border-green-900/40 overflow-hidden bg-[#151821]">
              <div className="flex items-center justify-between px-3 py-2 bg-green-500/10 border-b border-green-900/30">
                <span className="text-xs font-medium text-green-400">
                  + Improved
                </span>
              </div>
              <pre className="min-w-0 w-full max-h-40 sm:max-h-52 md:max-h-40 overflow-auto p-3 sm:p-4 text-[11px] sm:text-xs leading-6 font-mono text-green-200 whitespace-pre-wrap break-all">
                {reviewData.suggestedFix.improved}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
