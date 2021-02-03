import React from "react";
import { Formik, Form, Field } from "formik";
import "./FormItemWorkStages.scss";
import * as yup from "yup";
import AdminFormField from "../../AdminFormField/AdminFormField";
import { toastr } from "react-redux-toastr";
import { useDispatch } from "react-redux";
import { addNewStage } from "../../../../store/workStages/actions";
import { updateStagesByNewObject } from "../../../../store/workStages/operations";
import { checkIsInputNotChanges } from "../../../../utils/functions/checkIsInputNotChanges";

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
  iconSrc: yup.string("Введите текст").typeError("Введите текст").strict(true),
});

const FormItemWorkStages = ({
  sourceObj,
  isNew,
  children,
  put,
  post,
  uploadToS3,
  file,
}) => {
  const { num, name, iconSrc } = sourceObj;
  const dispatch = useDispatch();

  const updateStageTexts = async (values) => {
    const updatedObj = {
      ...sourceObj,
      ...values,
    };
    const updatedStage = await put(updatedObj);

    if (updatedStage.status === 200) {
      dispatch(updateStagesByNewObject(updatedStage.data, sourceObj._id));
      toastr.success(
        "Успешно",
        `Этап изменён на "${values.name}" в базе данных`
      );
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const handleUpdate = (values) => {
    if (file && checkIsInputNotChanges(values, sourceObj)) {
      uploadToS3(values, sourceObj._id);
    } else if (!file && !checkIsInputNotChanges(values, sourceObj)) {
      updateStageTexts(values);
    } else if (file && !checkIsInputNotChanges(values, sourceObj)) {
      uploadToS3(values, sourceObj._id).then(() => updateStageTexts(values));
    } else {
      toastr.warning("Сообщение", "Ничего не изменилось");
    }
  };

  const handlePostToDB = async (values) => {
    if (values.iconSrc || file) {
      const newStage = await post(values);

      if (newStage.status === 200) {
        if (file) {
          await uploadToS3(values, newStage.data._id);
        }

        dispatch(addNewStage({ ...newStage.data, iconSrc: values.iconSrc }));
        toastr.success(
          "Успешно",
          `Шаг "${values.name}" добавлен в базу данных`
        );
      } else {
        toastr.warning("Хм...", "Что-то пошло не так");
      }
    } else {
      toastr.warning("Warning", "Не добавлено изображение или путь к нему");
    }
  };

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
            name="num"
            errors={errors}
            labelName="Номер этапа"
          />
          <AdminFormField
            labelClassName="admin-stages__form-label"
            fieldClassName="admin-stages__form-input"
            errorClassName="admin-stages__form-error"
            name="name"
            errors={errors}
            labelName="Название этапа"
          />
          <AdminFormField
            labelClassName="admin-stages__form-label"
            fieldClassName="admin-stages__form-input"
            errorClassName="admin-stages__form-error"
            name="iconSrc"
            errors={errors}
            labelName="Ссылка на иконку шага"
          />
          {children}
          <Field
            type="submit"
            name="submit"
            className="admin-stages__submit-btn"
            value={isNew ? "Создать этап" : "Подтвердить изменения"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemWorkStages;
