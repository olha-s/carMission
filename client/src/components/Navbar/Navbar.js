import React from "react";
import NavbarItem from "../NavbarItem/NavbarItem";
import PropTypes from "prop-types";
import "./Navbar.scss"

const Navbar = ({
    items, className, onClick, mobileNavbar
}) => {

    const navbarItems = items.map((e) =>
        !e.disabled ? <NavbarItem
            className={className}
            textContent={e.textContent}
            contacts={e.contacts}
            sectionId={e.sectionId}
            id={e.id}
            key={e.id}
        /> : null
    )

    if(mobileNavbar) {
        return (
            <div className={`${className}__window`} onClick={onClick}>
                <ul className={className}>
                    {navbarItems}
                </ul>
            </div>
            )
        }

    return (
        <ul className={className}>
            {navbarItems}
        </ul>
    );

};

Navbar.propTypes = {
    items: PropTypes.array,
    className: PropTypes.string
};

Navbar.defaultProps = {
    items: [],
    className: ""
};


export default Navbar;