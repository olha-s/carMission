import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import axios from "axios";
import { useDispatch } from "react-redux";
import { validationSchema } from "../ValidationSchema";
import Button from "../../../generalComponents/Button/Button";
import "./FormItemBlogs.scss";
import { toastr } from "react-redux-toastr";
import { addNewBlog } from "../../../../store/Blogs/actions";
import { filterBlogs } from "../../../../store/Blogs/operations";

const FormItemBlogs = ({ obj, isNew }) => {
  const { photo, title, text, fullText, buttonText, date } = obj;

  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteFromDB = async (e) => {
    e.preventDefault();

    const deleted = await axios
      .delete(`/api/blogs/delete/${obj._id}`)
      .catch((err) => {
        toastr.error(err.message);
      });

    if (deleted.status === 200) {
      toastr.success("Успешно", `Блог с id "${obj._id}" удалён c базы данных`);
      dispatch(filterBlogs(obj._id));
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const handleDeleteNew = (e) => {
    e.preventDefault();
    setIsDeleted(true);
    toastr.success("Успешно", "Блог удалён до внесения в базу данных");
  };

  const handleUpdate = async (values) => {
    const updatedObj = {
      ...obj,
      ...values,
    };
    const updatedBlog = await axios
      .put(`/api/blogs/${obj._id}`, updatedObj)
      .catch((err) => {
        toastr.error(err.message);
      });

    if (updatedBlog.status === 200) {
      toastr.success(
        "Успешно",
        `Блог с id "${obj._id}" изменён в базе данных`
      );
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const handleAddToDB = async (values) => {
    const newBlog = await axios.post("/api/blogs/", values).catch((err) => {
      toastr.error(err.message);
    });
    if (newBlog.status === 200) {
      toastr.success("Успешно", "Блог добавлен в базу данных");
      dispatch(addNewBlog(newBlog.data));
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  if (isDeleted) {
    return null;
  }

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
          <Field
            disabled={isSubmitting}
            type="submit"
            name="submit"
            className="admin-blogs__submit-btn"
            value={isNew ? "Создать блог" : "Подтвердить изменения"}
          />
          <Button
            className="admin-blogs__delete-btn"
            text="&#10005;"
            onClick={isNew ? handleDeleteNew : handleDeleteFromDB}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemBlogs;
