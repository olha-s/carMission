import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./FormItemWorkStages.scss";
import * as yup from "yup";
import AdminFormField from "../../AdminFormField/AdminFormField";
import Button from "../../../generalComponents/Button/Button";
import { toastr } from "react-redux-toastr";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNewStage } from "../../../../store/workStages/actions";
import { filterWorkStages } from "../../../../store/workStages/operations";

const workStagesSchema = yup.object().shape({
  num: yup
    .number()
    .typeError("Введите число")
    .positive("Отрицательный шаг? Серьёзно?")
    .integer("Введите целое число")
    .required("Обязательное поле"),
  name: yup
    .string()
    .typeError("Введите текст")
    .strict(true)
    .required("Обязательное поле"),
  iconSrc: yup
    .string("Введите текст")
    .typeError("Введите текст")
    .strict(true)
    .required("Обязательное поле"),
});

const FormItemWorkStages = ({ sourceObj, isNew }) => {
  const { num, name, iconSrc } = sourceObj;
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteFromDB = async (e) => {
    e.preventDefault();

    const deleted = await axios
      .delete(`/api/work-stages/delete/${sourceObj._id}`)
      .catch((err) => {
        toastr.error(err.message);
      });

    if (deleted.status === 200) {
      toastr.success("Успешно", `Шаг "${name}" удалён в базе данных`);
      dispatch(filterWorkStages(sourceObj._id));
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const handleDeleteNew = (e) => {
    e.preventDefault();
    setIsDeleted(true);
    toastr.success("Успешно", "Шаг удалён до внесения в базу данных");
  };

  const handleUpdate = async (values) => {
    const updatedObj = {
      ...sourceObj,
      ...values,
    };
    const updatedStage = await axios
      .put(`/api/work-stages/${sourceObj._id}`, updatedObj)
      .catch((err) => {
        toastr.error(err.message);
      });

    if (updatedStage.status === 200) {
      toastr.success(
        "Успешно",
        `Шаг изменён на "${values.name}" в базе данных`
      );
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const handlePostToDB = async (values) => {
    const newStage = await axios
      .post("/api/work-stages/", values)
      .catch((err) => {
        toastr.error(err.message);
      });

    if (newStage.status === 200) {
      toastr.success("Успешно", `Шаг "${values.name}" добавлен в базу данных`);
      dispatch(addNewStage(newStage.data));
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <Formik
      initialValues={{ num, name, iconSrc }}
      validationSchema={workStagesSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={isNew ? handlePostToDB : handleUpdate}
    >
      {({ errors, touched }) => (
        <Form className="admin-stages__form-item">
          <AdminFormField
            labelClassName="admin-stages__form-label"
            fieldClassName="admin-stages__form-input"
            errorClassName="admin-stages__form-error"
            type="text"
            name="num"
            errors={errors}
            labelName="Номер шага"
          />
          <AdminFormField
            labelClassName="admin-stages__form-label"
            fieldClassName="admin-stages__form-input"
            errorClassName="admin-stages__form-error"
            type="text"
            name="name"
            errors={errors}
            labelName="Название шага"
          />
          <AdminFormField
            labelClassName="admin-stages__form-label"
            fieldClassName="admin-stages__form-input"
            errorClassName="admin-stages__form-error"
            type="text"
            name="iconSrc"
            errors={errors}
            labelName="Ссылка на иконку шага"
          />
          <Field
            type="submit"
            name="submit"
            className="admin-stages__submit-btn"
            value={isNew ? "Создать шаг" : "Подтвердить изменения"}
          />
          <Button
            className="admin-stages__delete-btn"
            text="&#10005;"
            onClick={isNew ? handleDeleteNew : handleDeleteFromDB}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemWorkStages;
