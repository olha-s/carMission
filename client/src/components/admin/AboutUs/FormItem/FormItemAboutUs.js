import React from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import "./FormItemAboutUs.scss";
import AdminFormField from "../../AdminFormField/AdminFormField";
import { toastr } from "react-redux-toastr";
import { updateFeaturesByNewObject } from "../../../../store/aboutUs/operations";
import { addNewFeature } from "../../../../store/aboutUs/actions";
import { checkIsInputNotChanges } from "../../../../utils/functions/checkIsInputNotChanges";

const validationSchemaCreator = (inputName) => {
  return yup.object().shape({
    imgPath: yup
      .string()
      // .required("Обязательное поле!")
      .min(15)
      .max(200, "Ошибка длины! Строка должна содержать 15-50 знаков"),
    [inputName]: yup
      .string()
      .required("Обязательное поле!")
      .min(15)
      .max(600, "Ошибка длины! Строка должна содержать 15-600 знаков"),
  });
};

const FormItemAboutUs = ({
  sourceObj,
  isNew,
  children,
  put,
  post,
  uploadToS3,
  file,
}) => {
  const { imgPath, title, text, isMain } = sourceObj;
  const dispatch = useDispatch();

  const updateFeatureTexts = async (values) => {
    const updatedObj = {
      ...sourceObj,
      ...values,
    };

    const updatedFeature = await put(updatedObj);

    if (updatedFeature.status === 200) {
      dispatch(updateFeaturesByNewObject(updatedFeature.data, sourceObj._id));
      toastr.success("Успешно", "Преимущество изменено в базе данных");
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const handleUpdate = (values) => {
    if (file && checkIsInputNotChanges(values, sourceObj)) {
      uploadToS3(values, sourceObj._id);
    } else if (!file && !checkIsInputNotChanges(values, sourceObj)) {
      updateFeatureTexts(values);
    } else if (file && !checkIsInputNotChanges(values, sourceObj)) {
      uploadToS3(values, sourceObj._id).then(() => updateFeatureTexts(values));
    } else {
      toastr.warning("Сообщение", "Ничего не изменилось");
    }
  };

  const handlePostToDB = async (values) => {
    if (values.imgPath || file) {
      const newObj = { ...values, isMain: false };
      const newFeature = await post(newObj);

      if (newFeature.status === 200) {
        if (file) {
          await uploadToS3(values, newFeature.data._id);
        }

        toastr.success("Успешно", "Преимущество добавлено в базу данных");
        dispatch(
          addNewFeature({ ...newFeature.data, imgPath: values.imgPath })
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
      initialValues={isMain ? { imgPath, text } : { imgPath, title }}
      validationSchema={validationSchemaCreator(isMain ? "text" : "title")}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={isNew ? handlePostToDB : handleUpdate}
    >
      {({ errors, touched }) => (
        <Form
          className={
            isMain
              ? "admin-about-us__form-main-item"
              : "admin-about-us__form-item"
          }
        >
          <AdminFormField
            labelClassName="admin-about-us__form-label"
            fieldClassName="admin-about-us__form-input"
            errorClassName="admin-about-us__form-error"
            name="imgPath"
            errors={errors}
            labelName="Путь к картинке"
          />
          <AdminFormField
            labelClassName="admin-about-us__form-label"
            fieldClassName={
              isMain
                ? "admin-about-us__form-textarea"
                : "admin-about-us__form-input"
            }
            errorClassName="admin-about-us__form-error"
            as={isMain ? "textarea" : "input"}
            name={isMain ? "text" : "title"}
            errors={errors}
            labelName={isMain ? "Текстовый контент" : "Подпись к картинке"}
          />
          {children}
          <Field
            type="submit"
            name="submit"
            className="admin-about-us__submit-btn"
            value={isNew ? "Создать преимущество" : "Подтвердить изменения"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemAboutUs;
