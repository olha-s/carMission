import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./FormContainerAboutUs.scss";
import { getFeatures } from "../../../../store/aboutUs/selectors";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import Button from "../../../generalComponents/Button/Button";
import FormItemAboutUs from "../FormItem/FormItemAboutUs";
import { getMainSections } from "../../../../store/appMainSections/selectors";

const FormContainerAboutUs = () => {
  const [formList, setFormList] = useState([]);
  const data = useSelector(getFeatures);
  const { heading } = useSelector(getMainSections).find(
    (s) => s.reactComponent === "AboutUs"
  );

  useEffect(() => {
    const mapFormToRender = () => {
      return data.map((feature) => {
        return <FormItemAboutUs sourceObj={feature} key={feature._id} />;
      });
    };
    setFormList(mapFormToRender());
  }, [data]);

  const createNewFormItem = () => {
    const empty = {
      title: "",
      imgPath: "",
      isMain: false,
      text: null,
    };

    return <FormItemAboutUs sourceObj={empty} isNew key={Date.now()} />;
  };

  const handleAddItem = () => {
    const form = createNewFormItem();

    const updated = formList.map((i) => i);
    updated.push(form);
    setFormList(updated);
  };

  return (
    <div className="admin-about-us">
      <SectionHeading text={heading} />
      <div className="admin-about-us__form-container">{formList}</div>
      <Button
        text="+"
        className="admin-about-us__add-btn"
        onClick={handleAddItem}
      />
    </div>
  );
};

export default FormContainerAboutUs;
