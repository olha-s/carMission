import React from "react";
import { Formik, Form, Field } from "formik";
import { initialValues } from "./initialValues";
import "../Main/FeedbackForm.scss";
import { number, object, string } from "yup";
import { useDispatch } from "react-redux";
import { postFeedback } from "../../../store/FeedbackForm/operations";
import { hideFeedbackFormAction } from "../../../store/FeedbackForm/actions";
import Button from "../../generalComponents/Button/Button";

const FeedbackFormElement = () => {
  const dispatch = useDispatch();

  const postFeedbackAndConfirm = (values) => {
    dispatch(postFeedback(values));
  };

  const hideFeedbackForm = () => {
    dispatch(hideFeedbackFormAction);
  };

  return (
    <Formik
      validationSchema={object({
        name: string()
          .required("введите Ваше имя")
          .min(2, "слишком короткое имя")
          .max(30, "слишком длинное имя"),
        phone: number("введите только цифры").required(
          "введите номер телефона"
        ),
      })}
      initialValues={initialValues}
      onSubmit={(values) => {
        postFeedbackAndConfirm(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="feedback-form">
          <Button
            className="feedback-form__exit-btn"
            text="&#215;"
            onClick={hideFeedbackForm}
          />
          <label className="feedback-form__name-label">
            Имя
            <Field name="name" className="feedback-form__field" />
            {touched.name && errors.name ? (
              <span className="error-message"> {errors.name}</span>
            ) : null}
          </label>

          <label className="feedback-form__phone-label">
            Ваш номер
            <Field name="phone" className="feedback-form__field" />
            {touched.phone && errors.phone ? (
              <span className="error-message"> {errors.phone}</span>
            ) : null}
          </label>

          <label className="feedback-form__button-label">
            <Field
              name="send-button"
              type="submit"
              value="Отправить"
              className="feedback-form__conf-button"
            />
          </label>
        </Form>
      )}
    </Formik>
  );
};

export default FeedbackFormElement;
