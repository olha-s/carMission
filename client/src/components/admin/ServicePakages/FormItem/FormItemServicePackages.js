import React from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";

const FormItemServicePackages = ({ name, price, currency, serviceList }) => {
  return (
    <Formik
      initialValues={{ name, price, currency, serviceList }}
      onSubmit={(values) => {
        console.log("confirm submit");
      }}
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
            value="Submit changes"
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemServicePackages;
