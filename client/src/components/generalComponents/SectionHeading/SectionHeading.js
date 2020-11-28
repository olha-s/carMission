import React from "react";
import PropTypes from "prop-types";
import "./SectionHeading.scss";

export const SectionHeading = ({ text }) => {
  return (
    <h2 data-testid="section-heading" className="section__heading">
      {text}
    </h2>
  );
};

SectionHeading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SectionHeading;
