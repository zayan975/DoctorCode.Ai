const express = require('express');
const {createReviewController, getReviewByIdController, getUserReviewsController } = require('../controllers/review.controller');
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router();

router.post('/',authMiddleware, createReviewController);
router.get('/:id', authMiddleware, getReviewByIdController);
router.get('/', authMiddleware, getUserReviewsController);

module.exports = router;