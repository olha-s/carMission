import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getReviews } from "../../../../store/ReviewCarousel/selectors";
import FormItemReviewCarousel from "../FormItem/FormItemReviewCarousel";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import "./FormContainerReviewCarousel.scss";
import Button from "../../../generalComponents/Button/Button";

const FormContainerReviewCarousel = () => {
  const [formList, setFormList] = useState([]);
  const data = useSelector(getReviews);

  useEffect(() => {
    const mapFormToRender = () => {
      return data.map((review) => {
        return <FormItemReviewCarousel obj={review} key={review._id} />;
      });
    };
    setFormList(mapFormToRender());
  }, [data]);

  const createNewFormItem = () => {
    const empty = {
      customerPhoto: "",
      customerName: "",
      carInfo: "",
      reviewText: "",
    };

    return <FormItemReviewCarousel obj={empty} isNew key={Date.now()} />;
  };

  const handleAddItem = () => {
    const form = createNewFormItem();

    const updated = formList.map((i) => i);
    updated.push(form);
    setFormList(updated);
  };

  return (
    <div className="admin-reviews">
      <SectionHeading text="Отзывы" />
      <div className="admin-reviews__form-container">{formList}</div>
      <Button
        text="+"
        className="admin-reviews__add-btn"
        onClick={handleAddItem}
      />
    </div>
  );
};
export default FormContainerReviewCarousel;
