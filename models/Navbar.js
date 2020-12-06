const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NavbarSchema = new Schema(
    {
        textContent: {
            type: String,
            required: true
        },
        headerLocation: {
            type: String,
            required: true
        },
        footerLocation: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            required: true
        },
        sectionId: {
            type: String,
        },
        onClick: {
            type: String,
        }, 
        contacts: {
            type: String,
        }
    }
);

module.exports = Navbar = mongoose.model("Navbar", NavbarSchema);
