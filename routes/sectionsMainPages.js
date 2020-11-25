const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addSectionMainPage,
  getSectionsMainPage,
  deleteAllSectionsMainPage,
} = require("../controllers/sectionsMainPage");

// @route   POST /sections-main
// @desc    Create new work stage
// @access  Private
router.post("/", addSectionMainPage);

// @route   GET /sections-main
// @desc    GET existing stages
// @access  Public
router.get("/", getSectionsMainPage);

// @route   DELETE /sections-main
// @desc    Delete all stages from collection
// @access  Private
router.delete("/", deleteAllSectionsMainPage);

module.exports = router;
