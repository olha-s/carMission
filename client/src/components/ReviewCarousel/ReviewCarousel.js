import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./ReviewCarousel.scss";
import ReviewItem from "../ReviewItem/ReviewItem";
import SectionHeading from "../generalComponents/SectionHeading/SectionHeading";

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    const reviewsDb = await axios("/api/reviews/").then((r) => r.data);
    setReviews(reviewsDb);
  };

  const allReviews = reviews.map((el) => (
    <ReviewItem
      reviewCard={el}
      key={el._id}
      src={el.customerPhoto}
      nameReviewer={el.customerName}
      nameCar={el.carInfo}
      review={el.reviewText}
    />
  ));

  return (
    <div className="carouse-wrapper">
      <SectionHeading text="Отзывы" />
        <Carousel showThumbs={false} transitionTime="150" showStatus={false} infiniteLoop={true} centerMode centerSlidePercentage="33.33">
        {allReviews}
      </Carousel>
    </div>
  );
};

export default ReviewCarousel;