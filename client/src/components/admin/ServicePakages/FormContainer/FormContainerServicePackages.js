import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import { getPackages } from "../../../../store/servicePackages/selectors";
import FormItemServicePackages from "../FormItem/FormItemServicePackages";
import "./FormContainerServicePackages.scss";
import Button from "../../../generalComponents/Button/Button";

const FormContainerServicePackages = () => {
  const [formList, setFormList] = useState([]);
  const data = useSelector(getPackages);

  useEffect(() => {
    const mapFormToRender = () => {
      return data.map((servicePackages) => {
        return (
          <FormItemServicePackages
            sourceObj={servicePackages}
            key={servicePackages._id}
          />
        );
      });
    };
    setFormList(mapFormToRender());
  }, [data]);

  const createNewFormItem = () => {
    const empty = {
      name: "",
      price: "",
      currency: "",
      serviceList: ["", ""],
    };
    return <FormItemServicePackages sourceObj={empty} isNew key={Date.now()} />;
  };

  const handleAddItem = () => {
    const form = createNewFormItem();
    const updated = formList.map((i) => i);
    updated.push(form);
    setFormList(updated);
  };

  return (
    <div className="admin-packages">
      <SectionHeading text="Пакеты услуг" />
      <div className="admin-packages__form-container">{formList}</div>
      <Button
        text="+"
        className="admin-packages__add-btn"
        onClick={handleAddItem}
      />
    </div>
  );
};

export default FormContainerServicePackages;
