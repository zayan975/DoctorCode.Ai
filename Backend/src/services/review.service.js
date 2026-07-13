const reviewModel = require("../models/Review");
const { analyzeCode } = require("../services/ai.service");

const ALLOWED_LANGUAGES = [
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
];

/**
 * Validates review input before hitting AI service.
 */
function validateReviewInput({ userId, language, code }) {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  if (!language || !ALLOWED_LANGUAGES.includes(language)) {
    throw new Error(
      `Invalid or missing language. Allowed: ${ALLOWED_LANGUAGES.join(", ")}`,
    );
  }

  if (!code || typeof code !== "string" || !code.trim()) {
    throw new Error("Code is required and must be a non-empty string.");
  }
}

async function createReview({ userId, language, code }) {
  // 1. Validate input
  validateReviewInput({ userId, language, code });

  let review = new reviewModel({
    user: userId,
    language,
    originalCode: code,
    status: "processing",
  });

  try {
    const aiResult = await analyzeCode(language, code);

    if (
      !aiResult?.score ||
      !aiResult?.aiResponse ||
      typeof aiResult.optimizedCode !== "string"
    ) {
      throw new Error("AI response is missing required fields.");
    }

    review.score = aiResult.score;
    review.aiResponse = aiResult.aiResponse;
    review.optimizedCode = aiResult.optimizedCode;
    review.status = "completed";

    await review.save();

    return review;
  } catch (err) {
    review.status = "failed";
    throw new Error(`Review failed: ${err.message}`);

    throw new Error(`Review failed: ${err.message}`);
  }
}

async function getReviewById(reviewId, userId) {
  const review = await reviewModel.findOne({ _id: reviewId, user: userId });

  if (!review) {
    throw new Error("Review not found.");
  }

  return review;
}

/**
 * Fetch all reviews for a user, most recent first.
 */
async function getUserReviews(userId) {
  return reviewModel.find({ user: userId }).sort({ createdAt: -1 });
}

module.exports = {
  createReview,
  getReviewById,
  getUserReviews,
};
