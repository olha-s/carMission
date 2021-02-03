import React from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import { useDispatch } from "react-redux";
import { validationSchema } from "../ValidationSchema";
import "./FormItemReviewCarousel.scss";
import { toastr } from "react-redux-toastr";
import { addNewReview } from "../../../../store/ReviewCarousel/actions";
import { updateReviewByNewObject } from "../../../../store/ReviewCarousel/operations";
import { checkIsInputNotChanges } from "../../../../utils/functions/checkIsInputNotChanges";

const FormItemReviewCarousel = ({
  sourceObj,
  isNew,
  children,
  post,
  put,
  file,
  uploadToS3,
}) => {
  const { customerPhoto, customerName, carInfo, reviewText } = sourceObj;

  const dispatch = useDispatch();

  const updateReviewInDB = async (values) => {
    const updatedObj = {
      ...sourceObj,
      ...values,
    };
    const updatedReview = await put(updatedObj);

    if (updatedReview.status === 200) {
      dispatch(updateReviewByNewObject(updatedReview.data));
      toastr.success(
        "Успешно",
        `Отзыв с id "${sourceObj._id}" изменён в базе данных`
      );
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const handleUpdate = (values) => {
    if (file && checkIsInputNotChanges(values, sourceObj)) {
      uploadToS3(values, sourceObj._id);
    } else if (!file && !checkIsInputNotChanges(values, sourceObj)) {
      updateReviewInDB(values);
    } else if (file && !checkIsInputNotChanges(values, sourceObj)) {
      uploadToS3(values, sourceObj._id).then(() => updateReviewInDB(values));
    } else {
      toastr.warning("Сообщение", "Ничего не изменилось");
    }
  };

  const handleAddToDB = async (values) => {
    const newReview = await post(values);
    if (newReview.status === 200) {
      toastr.success("Успешно", "Отзыв добавлен в базу данных");
      dispatch(addNewReview(newReview.data));
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  return (
    <Formik
      initialValues={{ customerPhoto, customerName, carInfo, reviewText }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={isNew ? handleAddToDB : handleUpdate}
    >
      {({ errors, touched, isValid, isSubmitting }) => (
        <Form className="admin-reviews__form-item" noValidate>
          <AdminFormField
            labelClassName="admin-reviews__form-label"
            fieldClassName="admin-reviews__form-input"
            errorClassName="admin-reviews__form-error"
            type="text"
            name="customerPhoto"
            errors={errors}
            labelName="Путь к фото"
          />
          <AdminFormField
            labelClassName="admin-reviews__form-label"
            fieldClassName="admin-reviews__form-input"
            errorClassName="admin-reviews__form-error"
            type="text"
            name="customerName"
            errors={errors}
            labelName="Имя покупателя"
          />
          <AdminFormField
            labelClassName="admin-reviews__form-label"
            fieldClassName="admin-reviews__form-input"
            errorClassName="admin-reviews__form-error"
            type="text"
            name="carInfo"
            errors={errors}
            labelName="Марка, модель авто"
          />
          <AdminFormField
            as="textarea"
            labelClassName="admin-reviews__form-label"
            fieldClassName="admin-reviews__form-textarea"
            errorClassName="admin-reviews__form-error"
            type="textarea"
            name="reviewText"
            errors={errors}
            labelName="Отзыв"
          />
          {children}
          <Field
            disabled={isSubmitting}
            type="submit"
            name="submit"
            className="admin-reviews__submit-btn"
            value={isNew ? "Создать отзыв" : "Подтвердить изменения"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemReviewCarousel;
