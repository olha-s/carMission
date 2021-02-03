import React from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import { useDispatch } from "react-redux";
import { validationSchema } from "../ValidationSchema";
import "./FormItemBlogs.scss";
import { toastr } from "react-redux-toastr";
import { addNewBlog } from "../../../../store/Blogs/actions";
import { checkIsInputNotChanges } from "../../../../utils/functions/checkIsInputNotChanges";
import { updateBlogsByNewObject } from "../../../../store/Blogs/operations";

const FormItemBlogs = ({
  sourceObj,
  isNew,
  children,
  put,
  post,
  file,
  uploadToS3,
}) => {
  const { photo, title, text, fullText, buttonText, date } = sourceObj;

  const dispatch = useDispatch();

  const updateInDB = async (values) => {
    const updatedObj = {
      ...sourceObj,
      ...values,
    };
    const updatedBlog = await put(updatedObj);

    if (updatedBlog.status === 200) {
      dispatch(updateBlogsByNewObject(updatedBlog.data));
      toastr.success(
        "Успешно",
        `Блог с id "${sourceObj._id}" изменён в базе данных`
      );
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const handleUpdate = (values) => {
    if (file && checkIsInputNotChanges(values, sourceObj)) {
      uploadToS3(values, sourceObj._id);
    } else if (!file && !checkIsInputNotChanges(values, sourceObj)) {
      updateInDB(values);
    } else if (file && !checkIsInputNotChanges(values, sourceObj)) {
      uploadToS3(values, sourceObj._id).then(() => updateInDB(values));
    } else {
      toastr.warning("Сообщение", "Ничего не изменилось");
    }
  };

  const handleAddToDB = async (values) => {
    const newBlog = await post(values);
    if (newBlog.status === 200) {
      toastr.success("Успешно", "Блог добавлен в базу данных");
      dispatch(addNewBlog(newBlog.data));
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  return (
    <Formik
      initialValues={{ photo, title, text, fullText, buttonText, date }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={isNew ? handleAddToDB : handleUpdate}
    >
      {({ errors, touched, isValid, isSubmitting }) => (
        <Form className="admin-blogs__form-item" noValidate>
          <AdminFormField
            labelClassName="admin-blogs__form-label"
            fieldClassName="admin-blogs__form-input"
            errorClassName="admin-blogs__form-error"
            type="text"
            name="photo"
            errors={errors}
            labelName="Путь к фото"
          />
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
            labelName="Краткий текст блога"
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
          <AdminFormField
            labelClassName="admin-blogs__form-label"
            fieldClassName="admin-blogs__form-input"
            errorClassName="admin-blogs__form-error"
            type="text"
            name="date"
            errors={errors}
            labelName="Дата"
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
