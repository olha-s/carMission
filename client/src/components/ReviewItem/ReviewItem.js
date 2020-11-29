import React from "react";
import PropTypes from "prop-types";
import { quotes } from "./quotes.jsx";
import "./ReviewItem.scss";
import Image from "../Image/Image";

const ReviewItem = ({ src, nameReviewer, nameCar, review }) => {
  return (
    <div className="reviewItem__wrapper">
      <Image className="reviewItem__img" src={src} alt="photo"/>
      <div className="reviewItem__info">
        <p className="reviewItem__name-reviewer">{nameReviewer}</p>
        <p className="reviewItem__name-car">{nameCar}</p>
        <span className="reviewItem__quotes">{quotes()}</span>
        <p data-testid="review-text" className="reviewItem__review">
          {review}
        </p>
      </div>
    </div>
  );
};
ReviewItem.propTypes = {
  nameReviewer: PropTypes.string.isRequired,
  nameCar: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
};

export default ReviewItem;
