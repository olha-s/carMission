import React from "react";
import PropTypes from "prop-types";
import "./Logo.scss";

const Logo = ({ className, src, id, alt }) => {
  return <img src={src} alt={alt} id={id} className={className} />;
};

Logo.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  id: PropTypes.string,
  alt: PropTypes.string,
};

Logo.defaultProps = {
  className: "",
  src: "",
  id: "",
  alt: "noname-img",
};

export default Logo;
