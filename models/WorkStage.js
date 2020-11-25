const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkStageSchema = new Schema({
  stageNum: {
    type: Number,
    required: true,
  },
  stageText: {
    type: String,
    required: true,
  },
});

module.exports = WorkStage = mongoose.model("work stage", WorkStageSchema);
