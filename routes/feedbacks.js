const express = require("express");
const router = express.Router();

//Import controllers
const {
  createFeedback,
   getFeedbacks,
  deleteFeedbacks
} = require("../controllers/feedbacks");

// @route   POST /cart
// @desc    Create cart
// @access  Private
router.post("/", createFeedback);

// @route   DELETE /cart
// @desc    Delete cart (when the order is placed or customer logging out)
// @access  Private
router.delete("/", deleteFeedbacks);

// @route   GET /cart
// @desc    Get cart for customer
// @access  Private
router.get("/", getFeedbacks);

module.exports = router;
