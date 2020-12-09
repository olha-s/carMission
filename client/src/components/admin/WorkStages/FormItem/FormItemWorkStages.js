import React from "react";
import { Formik, Form, Field } from "formik";
import "./FormItemWorkStages.scss";

import AdminFormField from "../../AdminFormField/AdminFormField";

const FormItemWorkStages = ({ num, name }) => {
  return (
    <Formik
      initialValues={{ num, name }}
      onSubmit={(values) => {
        console.log("confirm submit");
      }}
    >
      {({ errors, touched }) => (
        <Form className="admin__form-item">
          <AdminFormField
            className="admin__form-label"
            type="input"
            name="num"
            errors={errors}
            labelName="Номер шага"
          />
          <AdminFormField
            type="input"
            name="name"
            errors={errors}
            labelName="Название шага"
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

export default FormItemWorkStages;
