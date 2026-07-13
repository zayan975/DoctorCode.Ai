const mongoose = require("mongoose");

const airesponseSchema = {
  type: [
    {
      line: { type: Number },
      severity: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
      },
      message: { type: String },
      fix: { type: String },
    },
  ],
  default: [],
};

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    language: {
      type: String,
      enum: [
        "javascript",
        "typescript",
        "react",
        "nextjs",
        "nodejs",
        "express",
        "python",
        "java",
        "cpp",
        "csharp",
        "php",
        "laravel",
        "ruby",
        "go",
      ],
      required: true,
    },
    originalCode: {
      type: String,
      required: true,
    },
    optimizedCode: {
      type: String,
      default: "",
    },
    score: {
      overall: { type: Number, default: 0, min: 0, max: 100 },
      security: { type: Number, default: 0 },
      performance: { type: Number, default: 0 },
      readability: { type: Number, default: 0 },
      bestPractices: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ["processing", "completed", "accepted", "rejected", "failed"],
      default: "processing",
    },
    aiResponse: {
      bugs: airesponseSchema,
      security: airesponseSchema,
      performance: airesponseSchema,
      bestPractices: airesponseSchema,
      explanation: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

reviewSchema.index({ user: 1, createdAt: -1 });
reviewSchema.index({ status: 1 });
reviewSchema.index({ language: 1 });

const reviewModel = mongoose.model("Review", reviewSchema);
module.exports = reviewModel;
