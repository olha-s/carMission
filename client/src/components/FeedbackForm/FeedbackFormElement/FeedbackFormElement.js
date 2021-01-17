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
        <div className="feedback-form__wrapper" onClick={(event) => {if (event.target===event.currentTarget) {dispatch(hideFeedbackFormAction)}}}>
        <Form className="feedback-form">
          <Button
            className="feedback-form__exit-btn"
            text="&#215;"
            onClick={hideFeedbackForm}
          />

          <p className="feedback-form__heading">Обратная связь</p>

          <label className="feedback-form__name-label">
            <Field name="name" className="feedback-form__field" placeholder="Имя"/>
            {touched.name && errors.name ? (
              <span className="error-message"> {errors.name}</span>
            ) : null}
          </label>

          <label className="feedback-form__phone-label">
            <Field name="phone" className="feedback-form__field" placeholder="Ваш номер" />
            {touched.phone && errors.phone ? (
              <span className="error-message"> {errors.phone}</span>
            ) : null}
          </label>

          <label className="feedback-form__button-label">
            <Field
              name="send-button"
              type="submit"
              value="Отправить"
              className="feedback-form__button-field"
            />
          </label>
        </Form>
        </div>
      )}
    </Formik>
  );
};

export default FeedbackFormElement;
