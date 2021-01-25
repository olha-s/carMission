import React from "react";
import PropTypes from "prop-types";
import "./BlogItem.scss";
import Image from "../../Image/Image";

const BlogItem = ({ src, title, text, fullText, buttonText, date, onClick }) => {
  return (
    <div className="blog-item__wrapper">
      <div className="blog-item__img">
        <Image src={src} alt="photo"/>
      </div>
      <div className="blog-item__info">
        <h5 className="blog-item__title">{title}</h5>
        <p data-testid="blog-item__text" className="blog-item__text">{text}</p>
        <div className="blog-item__additionally">
          <button data-testid="btn" className="blog-item__btn" onClick={onClick}>{buttonText}</button>
          <p className="blog-item__date">{date}</p>
        </div>
      </div>

    </div>
  );
};

export default BlogItem;
BlogItem.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};