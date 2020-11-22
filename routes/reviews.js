const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addReview,
  getReviews
} = require("../controllers/reviews");

// @route   POST /catalog
// @desc    Create new category
// @access  Private
router.post(
  "/",
  addReview
);

// @route   GET /catalog
// @desc    GET existing categories
// @access  Public
router.get("/", getReviews);

module.exports = router;
