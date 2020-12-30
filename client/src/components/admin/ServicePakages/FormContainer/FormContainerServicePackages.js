import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import { getPackages } from "../../../../store/servicePackages/selectors";
import FormItemServicePackages from "../FormItem/FormItemServicePackages";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../generalComponents/Button/Button";

const FormContainerServicePackages = () => {
  const [formList, setFormList] = useState([]);
  const data = useSelector(getPackages);

  useEffect(() => {
    const mapFormToRender = () => {
      return data.map((servicePackages) => {
        return (
          <FormItemServicePackages
            sourceObject={servicePackages}
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
    <div className="">
      <SectionHeading text="Пакеты услуг" />
      <div className="">{formList}</div>
      <Button text="+" className="btn btn-primary" onClick={handleAddItem} />
    </div>
  );
};

export default FormContainerServicePackages;

//   const formList = data.map((servicePackages) => {
//     const { name, price, currency, serviceList } = servicePackages;
//     return (
//       <FormItemServicePackages
//         name={name}
//         price={price}
//         currency={currency}
//         serviceList={serviceList}
//         key={uuidv4()}
//       />
//     );
//   });
//
//   return (
//     <div className="admin__form-container">
//       <div className="admin__container-head">
//         <SectionHeading text="Пакеты Услуг" />
//       </div>
//       {formList}
//     </div>
//   );
// };
//
// export default FormContainerServicePackages;
