const express = require("express");
const router = express.Router();

//Import controllers
const {
    addLogo,
    getLogo,
} = require("../controllers/logo");

// @route   POST /catalog
// @desc    Create new category
// @access  Private
router.post("/", addLogo);

// @route   GET /catalog
// @desc    GET existing categories
// @access  Public
router.get("/", getLogo);


module.exports = router;
