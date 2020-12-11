import React from "react";
import { useSelector } from "react-redux";
import { getFeatures } from "../../../../store/aboutUs/selectors";
import FormItemWorkStages from "../FormItem/FormItemAboutUs";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import Button from "../../../generalComponents/Button/Button";

const FormContainerAboutUs = () => {
  const data = useSelector(getFeatures);

  // const newObj = {
  //   title: "",
  //   imgPath: "",
  //   isMain: false,
  //   text: null,
  //   // key: uuidv4(),
  // };

  const formList = data.map((feature) => {
    return <FormItemWorkStages obj={feature} key={feature._id} />;
  });

  return (
    <div className="admin__form-container">
      <div className="admin__container-head">
        <SectionHeading text="О нас" />
      </div>
      {formList}
      <Button className="admin__add-btn" text="Add item" onClick={() => {}} />
    </div>
  );
};

export default FormContainerAboutUs;
