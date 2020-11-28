import React, { memo } from "react";
import "./MainFeature.scss";
import useWinSize from "../../../../utils/hooks/UseWinSize";
import PropTypes from "prop-types";
import Image from "../../../../components/Image/Image";

const MainFeature = (props) => {
  const { className, imgPath, text } = props;
  const { width: winWidth } = useWinSize();
  const textContent = text.split("/");

  return (
    <>
      {winWidth <= 640 && (
        <div className={className}>
          <div className="about-us__content-box-text">
            <p>{textContent[0]}</p>
            <p>
              {textContent[1]}
              {textContent[2]}
            </p>
            <p>{textContent[3]}</p>
          </div>
        </div>
      )}

      {winWidth > 640 && (
        <div className={className}>
          <div className="about-us__content-box-img">
            <Image src={imgPath} alt="staff-photo" />
          </div>

          <div className="about-us__content-box-text">
            <p>{textContent[0]}</p>
            <p>
              {textContent[1]}
              {textContent[2]}
            </p>
            <p>{textContent[3]}</p>
          </div>
        </div>
      )}
    </>
  );
};

MainFeature.propTypes = {
  className: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

MainFeature.defaultProps = {
  altText: "featureImage",
};

export default memo(MainFeature);
