const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addWorkStage,
  getWorkStages,
  deleteWorkStages,
} = require("../controllers/workStages");

// @route   POST /work-stages
// @desc    Create new work stage
// @access  Private
router.post("/", addWorkStage);

// @route   GET /work-stages
// @desc    GET existing stages
// @access  Public
router.get("/", getWorkStages);

// @route   DELETE /work-stages
// @desc    Delete all stages from collection
// @access  Private
router.delete("/", deleteWorkStages);

module.exports = router;
