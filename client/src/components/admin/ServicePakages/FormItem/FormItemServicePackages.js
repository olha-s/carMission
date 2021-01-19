import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import Button from "../../../generalComponents/Button/Button";
import { toastr } from "react-redux-toastr";
import axios from "axios";
import "./FormItemServicePackages.scss";
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
      .delete(`/api/service-packages/delete/${sourceObj._id}`)
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
        `Пакет "${values.name}" изменён  в базе данных`
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
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={isNew ? handlePostToDB : handleUpdate}
    >
      {({ errors, touched, submitting }) => (
        <Form className="admin-packages__form-item">
          <AdminFormField
            labelclassName="admin-packages__form-label"
            fieldClassName="admin-packages__form-input"
            errorClassName="admin-packages__form-error"
            type="input"
            name="name"
            errors={errors}
            labelName="Название Пакета услуг"
          />
          <AdminFormField
            labelclassName="admin-packages__form-label"
            fieldClassName="admin-packages__form-input"
            errorClassName="admin-packages__form-error"
            type="input"
            name="price"
            errors={errors}
            labelName="Цена Пакета"
          />
          <AdminFormField
            labelclassName="admin-packages__form-label"
            fieldClassName="admin-packages__form-input"
            errorClassName="admin-packages__form-error"
            type="input"
            name="currency"
            errors={errors}
            labelName="Валюта"
          />
          <AdminFormField
            labelclassName="admin-packages__form-label"
            fieldClassName="admin-packages__form-input"
            errorClassName="admin-packages__form-error"
            type="input"
            name="serviceList"
            errors={errors}
            labelName="Список услуг"
          />
          <Field
            type="submit"
            name="submit"
            className="admin-packages__submit-btn"
            disabled={submitting}
            value={isNew ? "Создать пакет услуг" : "Подтвердить изменения"}
          />
          <Button
            className="admin-packages__delete-btn"
            text="&#10005;"
            onClick={isNew ? handleDeleteNew : handleDeleteFromDB}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemServicePackages;
