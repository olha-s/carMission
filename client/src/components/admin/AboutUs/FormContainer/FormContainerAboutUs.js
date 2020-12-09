import React from "react";
import { useSelector } from "react-redux";
import { getFeatures } from "../../../../store/aboutUs/selectors";
import { v4 as uuidv4 } from "uuid";
import FormItemWorkStages from "../FormItem/FormItemAboutUs";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";

const FormContainerAboutUs = () => {
  const data = useSelector(getFeatures);

  const formList = data.map((feature) => {
    const { imgPath, title, text, isMain } = feature;

    return (
      <FormItemWorkStages
        imgPath={imgPath}
        isMain={isMain}
        text={text}
        title={title}
        key={uuidv4()}
      />
    );
  });

  return (
    <div className="admin__form-container">
      <div className="admin__container-head">
        <SectionHeading text="О нас" />
      </div>
      {formList}
    </div>
  );
};

export default FormContainerAboutUs;
