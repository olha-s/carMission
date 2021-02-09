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
        },
        numberInNavbar: {
            type: String,
            required: true
        },
        sectionId: {
            type: String,
        },
        contacts: {
            type: String,
        }
    }
);

module.exports = Navbar = mongoose.model("Navbar", NavbarSchema);
