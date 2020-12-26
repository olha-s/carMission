import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import FormItem from "../FormItem/FormItem";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import "./FormContainer.scss";
import { getMainSections } from "../../../../store/appMainSections/selectors";
import Button from "../../../generalComponents/Button/Button";

const FormContainerMainPageSections = () => {
  const data = useSelector(getMainSections);
  const [sectionCreationStatus, setSectionCreationStatus] = useState("no");

  const formList = data.map((section) => {
    const { heading, description, index, disabled, _id } = section;
    return (
      <FormItem
        obj={section}
        heading={heading}
        description={description}
        index={index}
        disabled={disabled}
        id={_id}
        key={uuidv4()}
      />
    );
  });

  useEffect(() => {}, [data]);

  const emptySectionObject = {
    heading: "",
    description: "",
    index: "",
    disabled: true,
    name: "",
    reactComponent: "",
  };

  return (
    <div className="admin__form-container">
      <div className="admin__container-head">
        <SectionHeading text="Секции главной страницы" />
      </div>
      {formList}
      {sectionCreationStatus === "creating" ? (
        <FormItem
          obj={emptySectionObject}
          sectionCreationStatus={sectionCreationStatus}
          setSectionCreationStatus={(status) =>
            setSectionCreationStatus(status)
          }
        />
      ) : null}

      <Button
        text="+"
        className="admin__add-btn"
        onClick={() => {
          setSectionCreationStatus("creating");
        }}
      />
    </div>
  );
};

export default FormContainerMainPageSections;
