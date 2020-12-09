import React from "react";
import { useSelector } from "react-redux";
import { getWorkStages } from "../../../../store/workStages/selectors";
import { v4 as uuidv4 } from "uuid";
import FormItemWorkStages from "../FormItem/FormItemWorkStages";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import "./FormContainerWorkStages.scss";

const FormContainerWorkStages = () => {
  const data = useSelector(getWorkStages);

  const formList = data.map((stage) => {
    const { num, name } = stage;
    return <FormItemWorkStages num={num} name={name} key={uuidv4()} />;
  });

  return (
    <div className="admin__form-container">
      <div className="admin__container-head">
        <SectionHeading text="Этапы сотрудничества" />
      </div>
      {formList}
    </div>
  );
};

export default FormContainerWorkStages;
