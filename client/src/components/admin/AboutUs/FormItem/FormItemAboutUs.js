import React from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";

const FormItemWorkStages = ({ imgPath, title: propsTitle, text, isMain }) => {
  const title = text && !propsTitle ? text : propsTitle;

  return (
    <Formik
      initialValues={{ imgPath, title }}
      onSubmit={(values) => {
        console.log("confirm submit");
      }}
    >
      {({ errors, touched }) => (
        <Form className="admin__form-item">
          <AdminFormField
            className="admin__form-label"
            type="input"
            name="imgPath"
            errors={errors}
            labelName="Путь к картинке"
          />
          <AdminFormField
            as={isMain ? "textarea" : "input"}
            type={isMain ? "textarea" : "input"}
            fieldClassName={isMain ? "admin__form-textarea" : ""}
            name="title"
            errors={errors}
            labelName={isMain ? "Текстовый контент" : "Подпись к картинке"}
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
