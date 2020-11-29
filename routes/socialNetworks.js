const express = require("express");
const router = express.Router();

//Import controllers
const {
    addSocialNetworksData,
    getSocialNetworksData,
    deleteAllSocialNetworksData
} = require("../controllers/socialNetworks");

// @route   POST /catalog
// @desc    Create new category
// @access  Private
router.post("/", addSocialNetworksData);

// @route   GET /catalog
// @desc    GET existing categories
// @access  Public
router.get("/", getSocialNetworksData);

// @route   DELETE /sections-main
// @desc    Delete all stages from collection
// @access  Private
router.delete("/", deleteAllSocialNetworksData);


module.exports = router;
