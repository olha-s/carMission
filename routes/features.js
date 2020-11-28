const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const { addFeature, getFeatures } = require("../controllers/features");

// @route   POST api/features
// @desc    Create new category
// @access  Private
router.post("/", addFeature);

// @route   GET api/features
// @desc    GET existing categories
// @access  Public
router.get("/", getFeatures);

module.exports = router;
