import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import FormItem from "../FormItem/FormItem";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import "./FormContainer.scss";
import { getMainSections } from "../../../../store/appMainSections/selectors";

const FormContainerMainPageSections = () => {
  const data = useSelector(getMainSections);

  const formList = data.map((section) => {
    const { heading, description, index, disabled } = section;
    return <FormItem heading={heading} description={description} index={index} disabled={disabled}  key={uuidv4()} />;
  });

  return (
    <div className="admin__form-container">
      <div className="admin__container-head">
        <SectionHeading text="Секции главной страницы" />
      </div>
      {formList}
    </div>
  );
};

export default FormContainerMainPageSections;
