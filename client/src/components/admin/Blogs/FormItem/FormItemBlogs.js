import React from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import { validationSchema } from "../ValidationSchema";
import "./FormItemBlogs.scss";

const FormItemBlogs = ({
  sourceObj,
  isNew,
  children,
  handlePost,
  handleUpdate,
}) => {
  const { photo, title, text, fullText, buttonText, date } = sourceObj;

  return (
    <Formik
      initialValues={{ photo, title, text, fullText, buttonText, date }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={isNew ? handlePost : handleUpdate}
    >
      {({ errors, isSubmitting }) => (
        <Form className="admin-blogs__form-item" noValidate>
          {/* <AdminFormField
            labelClassName="admin-blogs__form-label"
            fieldClassName="admin-blogs__form-input"
            errorClassName="admin-blogs__form-error"
            type="text"
            name="photo"
            errors={errors}
            labelName="Путь к фото"
          /> */}
          <AdminFormField
            labelClassName="admin-blogs__form-label"
            fieldClassName="admin-blogs__form-input"
            errorClassName="admin-blogs__form-error"
            type="text"
            name="title"
            errors={errors}
            labelName="Заголовок блога"
          />
          <AdminFormField
            as="textarea"
            labelClassName="admin-blogs__form-label"
            fieldClassName="admin-blogs__form-textarea"
            errorClassName="admin-blogs__form-error"
            type="textarea"
            name="text"
            errors={errors}
            labelName="Краткое описание блога"
          />
          <AdminFormField
            as="textarea"
            labelClassName="admin-blogs__form-label"
            fieldClassName="admin-blogs__form-textarea"
            errorClassName="admin-blogs__form-error"
            type="textarea"
            name="fullText"
            errors={errors}
            labelName="Текст блога"
          />
          <AdminFormField
            labelClassName="admin-blogs__form-label"
            fieldClassName="admin-blogs__form-input"
            errorClassName="admin-blogs__form-error"
            type="text"
            name="buttonText"
            errors={errors}
            labelName="Текст на кнопке"
          />
          {children}
          <Field
            disabled={isSubmitting}
            type="submit"
            name="submit"
            className="admin-blogs__submit-btn"
            value={isNew ? "Создать блог" : "Подтвердить изменения"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemBlogs;
