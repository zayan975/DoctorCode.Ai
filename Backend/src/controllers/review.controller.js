const {
  createReview,
  getReviewById,
  getUserReviews,
} = require("../services/review.service");

/**
 * POST /api/reviews
 * Create a new code review
 */
async function createReviewController(req, res) {
  try {
    const userId = req.user._id;
    const { language, code } = req.body;

    const review = await createReview({ userId, language, code });

    return res.status(201).json({
      success: true,
      message: "Review created successfully.",
      data: review,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

/**
 * GET /api/reviews/:id
 * Fetch a single review by ID (must belong to logged-in user)
 */
async function getReviewByIdController(req, res) {
  try {
    const userId = req.user._id;
    const { id } = req.params; // 👈 missing tha, add kiya

    const review = await getReviewById(id, userId);
    return res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

/**
 * GET /api/reviews
 * Fetch all reviews of the logged-in user
 */
async function getUserReviewsController(req, res) {
  try {
    const userId = req.user._id;
    const reviews = await getUserReviews(userId);

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  createReviewController,
  getReviewByIdController,
  getUserReviewsController,
};
