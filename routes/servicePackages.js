const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addServicePackage,
  getServicePackages
} = require("../controllers/servicePackages");

// @route   POST /catalog
// @desc    Create new category
// @access  Private
router.post(
  "/",
  addServicePackage
);

// @route   GET /catalog
// @desc    GET existing categories
// @access  Public
router.get("/",
  getServicePackages);

module.exports = router;