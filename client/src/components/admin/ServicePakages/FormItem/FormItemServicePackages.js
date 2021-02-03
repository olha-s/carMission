import React from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import { toastr } from "react-redux-toastr";
import "./FormItemServicePackages.scss";
import { useDispatch } from "react-redux";
import { addPackages } from "../../../../store/servicePackages/actions";
import AdminServiceList from "../AdminServiceList/AdminServiceList";
import { checkIsInputNotChanges } from "../../../../utils/functions/checkIsInputNotChanges";

const FormItemServicePackages = ({ sourceObj, isNew, children, put, post }) => {
  const { name, price, currency, serviceList } = sourceObj;
  const dispatch = useDispatch();

  const handleUpdate = async (values) => {
    if (!checkIsInputNotChanges(values, sourceObj)) {
      const updatedObj = {
        ...sourceObj,
        ...values,
      };
      const updatedPackages = await put(updatedObj);

      if (updatedPackages.status === 200) {
        toastr.success(
          "Успешно",
          `Пакет "${values.name}" изменён  в базе данных`
        );
      } else {
        toastr.warning("Хм...", "Что-то пошло не так");
      }
    } else {
      toastr.warning("Сообщение", "Ничего не изменилось");
    }
  };

  const handlePostToDB = async (values) => {
    const newPackage = await post(values);

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

  return (
    <Formik
      initialValues={{ name, price, currency, serviceList }}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={isNew ? handlePostToDB : handleUpdate}
    >
      {({ errors, touched, submitting, values }) => (
        <Form className="admin-packages__form-item">
          <AdminFormField
            labelClassName="admin-packages__form-label"
            fieldClassName="admin-packages__form-input"
            errorClassName="admin-packages__form-error"
            type="input"
            name="name"
            errors={errors}
            labelName="Название Пакета услуг"
          />
          <AdminFormField
            labelClassName="admin-packages__form-label"
            fieldClassName="admin-packages__form-input"
            errorClassName="admin-packages__form-error"
            type="input"
            name="price"
            errors={errors}
            labelName="Цена Пакета"
          />
          <AdminFormField
            labelClassName="admin-packages__form-label"
            fieldClassName="admin-packages__form-input"
            errorClassName="admin-packages__form-error"
            type="input"
            name="currency"
            errors={errors}
            labelName="Валюта"
          />
          <AdminServiceList errors={errors} values={values} />
          {children}
          <Field
            type="submit"
            name="submit"
            className="admin-packages__submit-btn"
            disabled={submitting}
            value={isNew ? "Создать пакет услуг" : "Подтвердить изменения"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemServicePackages;
