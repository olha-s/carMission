import React from "react";
import { Formik, Form, Field } from "formik";
import "./FormItem.scss";
import AdminFormField from "../../AdminFormField/AdminFormField";
import Select from "react-select";

const FormItem = ({ heading, description, index, disabled }) => {
  return (
    <Formik
      initialValues={{ heading, description, index, disabled }}
      onSubmit={(values) => {
        console.log("confirm submit");
      }}
    >
      {({ errors, touched }) => (
        <Form className="admin__form-item">
          <AdminFormField
            className="admin__form-label"
            type="input"
            name="heading"
            errors={errors}
            labelName="Заголовок"
          />
          <AdminFormField
            className="admin__form-label"
            type="input"
            name="description"
            errors={errors}
            labelName="Описание"
            as="textarea"
          />
          <AdminFormField
            className="admin__form-label"
            type="input"
            name="index"
            errors={errors}
            labelName="Порядок при отображении"
          />
          <div>
            <p>Скрыть секцию на странице</p>
            <Select
              className="admin__input"
              placeholder={disabled.toString()}
              options={[
                { value: "true", label: "true" },
                { value: "false", label: "false" },
              ]}
            />
          </div>
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

export default FormItem;
