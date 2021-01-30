const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addSectionMainPage,
  getSectionsMainPage,
  deleteSectionMainPage,
  updateSectionMainPage,
} = require("../controllers/sectionsMainPage");

// @route   POST /sections-main
// @desc    Create new section on page
// @access  Private
router.post("/", addSectionMainPage);

// @route   GET /sections-main
// @desc    GET existing sections
// @access  Public
router.get("/", getSectionsMainPage);

// @route   DELETE /sections-main
// @desc    Delete one section from collection
// @access  Private
router.delete(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  deleteSectionMainPage
);

// @route   PUT /sections-main
// @desc    Update a section in collection
// @access  Private

router.put(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  updateSectionMainPage
);

module.exports = router;
