const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
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
// @route   PUT api/features/:id
// @desc    Update existing comment
// @access  Private


router.put(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  updateReview
);

// @route   DELETE api/features/:id
// @desc    Delete existing comment
// @access  Private
router.delete(
  "/delete/:id",
  // passport.authenticate("jwt", { session: false }),
  deleteReview
);

module.exports = router;
