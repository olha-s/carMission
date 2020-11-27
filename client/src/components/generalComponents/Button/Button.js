import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

export const Button = ({text, onClick, className}) => {
    return (
        <button data-testid='btn' className={className} onClick={onClick}>{text}</button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired
};

export default Button;