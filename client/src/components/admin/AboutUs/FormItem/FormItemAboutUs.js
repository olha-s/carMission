import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import "./FormItemAboutUs.scss";
import AdminFormField from "../../AdminFormField/AdminFormField";
import Button from "../../../generalComponents/Button/Button";
import { toastr } from "react-redux-toastr";
import {
  filterAboutUs,
  updateFeaturesByNewObject,
  updateFeaturesByNewSrc,
} from "../../../../store/aboutUs/operations";
import { addNewFeature } from "../../../../store/aboutUs/actions";
import AdminDropZone from "../../AdminDropZone/AdminDropZone";
import { checkIsInputChanges } from "../../../../utils/functions/checkIsInputChanges";
import ModalDeleteConfirmation from "../../ModalDeleteConfirmation/ModalDeleteConfirmation";

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

const FormItemAboutUs = ({ sourceObj, isNew }) => {
  const { imgPath, title, text, isMain } = sourceObj;
  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState(false);
  const [fileReady, setFileReady] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteFromDB = async (e) => {
    e.preventDefault();

    const deleted = await axios
      .delete(`/api/features/delete/${sourceObj._id}`)
      .catch((err) => {
        toastr.error(err.message);
      });

    if (deleted.status === 200) {
      toastr.success("Успешно", "Преимущество удалено из базы данных");
      dispatch(filterAboutUs(sourceObj._id));
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const handleDeleteNew = (e) => {
    e.preventDefault();
    setIsDeleted(true);
    toastr.success("Успешно", "Преимущество удалено до внесения в базу данных");
  };

  const uploadImgAndUpdateStore = async (values, id) => {
    const res = await axios
      .post(`/api/features/upload/${id}`, fileReady, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => {
        toastr.error(err.message);
      });

    dispatch(updateFeaturesByNewSrc(res.data.location, id));
    setFileReady(null);
    values.imgPath = res.data.location;
    toastr.success("Успешно", "Изображение загружено");
  };

  const updateFeatureTexts = async (values) => {
    const updatedObj = {
      ...sourceObj,
      ...values,
    };

    const updatedFeature = await axios
      .put(`/api/features/${sourceObj._id}`, updatedObj)
      .catch((err) => {
        toastr.error(err.message);
      });

    if (updatedFeature.status === 200) {
      dispatch(updateFeaturesByNewObject(updatedFeature.data, sourceObj._id));
      toastr.success("Успешно", "Преимущество изменено в базе данных");
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const handleUpdate = (values) => {
    if (fileReady && checkIsInputChanges(values, sourceObj)) {
      uploadImgAndUpdateStore(values, sourceObj._id);
    } else if (!fileReady && !checkIsInputChanges(values, sourceObj)) {
      updateFeatureTexts(values);
    } else if (fileReady && !checkIsInputChanges(values, sourceObj)) {
      uploadImgAndUpdateStore(values, sourceObj._id).then(() =>
        updateFeatureTexts(values)
      );
    } else {
      toastr.warning("Сообщение", "Ничего не изменилось");
    }
  };

  const handlePostToDB = async (values) => {
    if (values.imgPath || fileReady) {
      const newObj = { ...values, isMain: false };
      const newFeature = await axios
        .post("/api/features/", newObj)
        .catch((err) => {
          toastr.error(err.message);
        });

      if (newFeature.status === 200) {
        if (fileReady) {
          await uploadImgAndUpdateStore(values, newFeature.data._id);
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

  const openConfirmModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  if (isDeleted) {
    return null;
  }

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
            type="input"
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
            type={isMain ? "textarea" : "input"}
            name={isMain ? "text" : "title"}
            errors={errors}
            labelName={isMain ? "Текстовый контент" : "Подпись к картинке"}
          />
          <AdminDropZone
            imgURL={imgPath}
            setFile={setFileReady}
            file={fileReady}
          />
          <Field
            type="submit"
            name="submit"
            className="admin-about-us__submit-btn"
            value={isNew ? "Создать преимущество" : "Подтвердить изменения"}
          />
          <Button
            className="admin-about-us__delete-btn"
            text="&#10005;"
            onClick={openConfirmModal}
          />
          <ModalDeleteConfirmation
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            deleteHandler={isNew ? handleDeleteNew : handleDeleteFromDB}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemAboutUs;
