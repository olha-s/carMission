import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getBlogs } from "../../../../store/Blogs/selectors";
import FormItemBlogs from "../FormItem/FormItemBlogs";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import "./FormContainerBlogs.scss";
import Button from "../../../generalComponents/Button/Button";

const FormContainerBlogs = () => {
  const [formList, setFormList] = useState([]);
  const data = useSelector(getBlogs);

  useEffect(() => {
    const mapFormToRender = () => {
      return data.map((review) => {
        return <FormItemBlogs obj={review} key={review._id} />;
      });
    };
    setFormList(mapFormToRender());
  }, [data]);

  const createNewFormItem = () => {
    const empty = {
      photo: "",
      title: "",
      text: "",
      fullText: "",
      buttonText: "",
      date: "",
    };

    return <FormItemBlogs obj={empty} isNew key={Date.now()} />;
  };

  const handleAddItem = () => {
    const form = createNewFormItem();

    const updated = formList.map((i) => i);
    updated.push(form);
    setFormList(updated);
  };

  return (
    <div className="admin-blogs">
      <SectionHeading text="Блог" />
      <div className="admin-blogs__form-container">{formList}</div>
      <Button
        text="+"
        className="admin-blogs__add-btn"
        onClick={handleAddItem}
      />
    </div>
  );
};
export default FormContainerBlogs;
