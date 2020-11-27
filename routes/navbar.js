const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
    addNavbarItem,
    getNavbarItem,
    deleteNavbarItem
} = require("../controllers/navbar");

// @route   POST /catalog
// @desc    Create new category
// @access  Private
router.post("/", addNavbarItem);

// @route   GET /catalog
// @desc    GET existing categories
// @access  Public
router.get("/", getNavbarItem);

// @route   DELETE /links/:id
// @desc    DELETE existing links
// @access  Private
router.delete(
    "/:id",
    // passport.authenticate("jwt-admin", { session: false }),
    deleteNavbarItem
);

module.exports = router;
