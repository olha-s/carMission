import React, { memo } from "react";
import "./RegularFeature.scss";
import PropTypes from "prop-types";

const RegularFeature = (props) => {
  const { className, title, imgPath, altText } = props;

  return (
    <div className={className}>
      <img data-testid="regularFeature-img" src={imgPath} alt={altText} />
      <p data-testid="regularFeature-title">{title}</p>
    </div>
  );
};

RegularFeature.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

RegularFeature.defaultProps = {
  altText: "featureImage",
};

export default memo(RegularFeature);
