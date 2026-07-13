const express = require('express');
const {createReviewController, getReviewByIdController, getUserReviewsController } = require('../controllers/review.controller');
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router();

// Send review to AI
router.post('/',authMiddleware, createReviewController);
// Get Review from user by id
router.get('/:id', authMiddleware, getReviewByIdController);
// Get user All reviews
router.get('/', authMiddleware, getUserReviewsController);

module.exports = router;