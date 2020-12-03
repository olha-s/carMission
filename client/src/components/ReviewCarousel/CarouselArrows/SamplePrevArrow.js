import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../ReviewCarousel.scss";

const SamplePrevArrow = ({onClick}) => {
    return (
        <div className="arrow__prev" onClick={onClick}></div>
    )
}

export default SamplePrevArrow;