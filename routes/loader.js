const express = require("express");
const router = express.Router();

//Import controllers
const {
    addLoaderData,
    getLoaderData,
    deleteAllLoaderData
} = require("../controllers/loader");

// @route   POST /catalog
// @desc    Create new category
// @access  Private
router.post("/", addLoaderData);

// @route   GET /catalog
// @desc    GET existing categories
// @access  Public
router.get("/", getLoaderData);

// @route   DELETE /sections-main
// @desc    Delete all stages from collection
// @access  Private
router.delete("/", deleteAllLoaderData);


module.exports = router;
