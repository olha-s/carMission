import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../ReviewCarousel.scss";

const SampleNextArrow = ({onClick}) => {
    return (
        <div className="arrow__next" onClick={onClick}></div>
    );
};

export default SampleNextArrow;