import React from "react";
import { Formik, Form, Field } from "formik";
import "./FormItem.scss";
import AdminFormField from "../../AdminFormField/AdminFormField";
import { validationSchema } from "../validationSchema";

const FormItem = ({ sourceObj, children, handleUpdate }) => {
  const { heading, description, index, disabled, name, imgPath } = sourceObj;

  return (
    <Formik
      initialValues={{
        heading,
        description,
        index,
        disabled,
        name,
        imgPath,
      }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleUpdate}
    >
      {({ errors }) => (
        <Form className="admin__form-item">
          <AdminFormField
            className="admin__form-label"
            type="text"
            name="heading"
            errors={errors}
            labelName="Заголовок"
          />
          <AdminFormField
            className="admin__form-label"
            type="text"
            name="description"
            errors={errors}
            labelName="Описание"
            as="textarea"
          />
          <AdminFormField
            className="admin__form-label"
            type="text"
            name="index"
            errors={errors}
            labelName="Порядок при отображении"
          />
          <AdminFormField
            className="admin__form-label"
            type="text"
            name="name"
            errors={errors}
            labelName="Имя ссылки якоря"
          />
          {imgPath && (
            <AdminFormField
              className="admin__form-label"
              type="text"
              name="imgPath"
              errors={errors}
              labelName="Ссылка на изображение"
            />
          )}
          <label className="admin__label admin__checkbox-label">
            <Field
              className="admin__input admin__checkbox-input"
              type="checkbox"
              name="disabled"
            />
            <span className="admin__label-name admin__checkbox-label-name">
              &nbsp;Скрыть секцию на странице
            </span>
          </label>
          {children}
          <Field
            type="submit"
            name="submit"
            className="admin__submit-btn"
            value="Подтвердить изменения"
          />
        </Form>
      )}
    </Formik>
  );
};
export default FormItem;
