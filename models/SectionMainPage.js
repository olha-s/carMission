const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectionMainPageSchema = new Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false,
  },
  index: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  reactComponent: {
    type: String,
    required: true,
  },
});

module.exports = SectionMainPage = mongoose.model(
  "section",
  SectionMainPageSchema
);
