const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogoSchema = new Schema(
    {
        path: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            required: true
        }
    }
);

module.exports = Logo = mongoose.model("Logo", LogoSchema);