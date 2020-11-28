const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoaderSchema = new Schema(
    {
        className: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        }
    }
);

module.exports = Loader = mongoose.model("Loader", LoaderSchema);