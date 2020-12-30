import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import Button from "../../../generalComponents/Button/Button";
import { toastr } from "react-redux-toastr";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addPackages } from "../../../../store/servicePackages/actions";
import { filterServicePackages } from "../../../../store/servicePackages/operations";

const FormItemServicePackages = ({ sourceObj, isNew }) => {
  const { name, price, currency, serviceList } = sourceObj;
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteFromDB = async (e) => {
    e.preventDefault();

    const deleted = await axios
      .delete(`api/service-packages/delete/${sourceObj._id}`)
      .catch((err) => {
        toastr.error(err.message);
      });
    if (deleted.status === 200) {
      toastr.success("Успешно", `Пакет "${name}" удалён в базе данных`);
      dispatch(filterServicePackages(sourceObj._id));
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const handleDeleteNew = (e) => {
    e.preventDefault();
    setIsDeleted(true);
    toastr.success("Успешно", "Пакет удалён до внесения в базу данных");
  };

  const handleUpdate = async (values) => {
    const updatedObj = {
      ...sourceObj,
      ...values,
    };
    const updatedPackages = await axios
      .put(`/api/service-packages/${sourceObj._id}`, updatedObj)
      .catch((err) => {
        toastr.error(err.message);
      });

    if (updatedPackages.status === 200) {
      toastr.success(
        "Успешно",
        `Пакет изменён на "${values.name}" в базе данных`
      );
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const handlePostToDB = async (values) => {
    const newPackage = await axios
      .post("/api/service-packages/", values)
      .catch((err) => {
        toastr.error(err.message);
      });

    if (newPackage.status === 200) {
      toastr.success(
        "Успешно",
        `Пакет "${values.name}" добавлен в базу данных`
      );
      dispatch(addPackages(newPackage.data));
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };
  if (isDeleted) {
    return null;
  }

  return (
    <Formik
      initialValues={{ name, price, currency, serviceList }}
      onSubmit={isNew ? handlePostToDB : handleUpdate}
    >
      {({ errors, touched }) => (
        <Form className="admin__form-item">
          <AdminFormField
            className="admin__form-label"
            type="input"
            name="name"
            errors={errors}
            labelName="Название Пакета услуг"
          />
          <AdminFormField
            type="input"
            name="Price"
            errors={errors}
            labelName="Цена Пакета"
          />
          <AdminFormField
            type="input"
            name="Currency"
            errors={errors}
            labelName="Валюта"
          />
          <Field
            type="submit"
            name="submit"
            className="admin__submit-btn"
            value={isNew ? "Создать пакет услуг" : "Подтвердить изменения"}
          />
          <Button
            className="button2-send-request"
            text="&#10005;"
            onClick={isNew ? handleDeleteNew : handleDeleteFromDB}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemServicePackages;
