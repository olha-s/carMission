import React from "react";
import { useSelector } from "react-redux";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import { getPackages } from "../../../../store/servicePackages/selectors";
import FormItemServicePackages from "../FormItem/FormItemServicePackages";
import { v4 as uuidv4 } from "uuid";

const FormContainerServicePackages = () => {
  const data = useSelector(getPackages);

  const formList = data.map((packages) => {
    const { name, price, currency, serviceList } = packages;
    return (
      <FormItemServicePackages
        name={name}
        price={price}
        currency={currency}
        serviceList={serviceList}
        key={uuidv4()}
      />
    );
  });

  return (
    <div className="admin__form-container">
      <div className="admin__container-head">
        <SectionHeading text="Пакеты Услуг" />
      </div>
      {formList}
    </div>
  );
};

export default FormContainerServicePackages;
