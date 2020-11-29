import React from "react";
import { Formik, Form, Field } from "formik";
import { initialValues } from "./initialValues";
import "./FeedbackForm.scss";
import { number, object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { feedbackFormOpen } from "../../store/selectors/feedbackFormSelectors";
import { hideFeedbackFormAction } from "../../store/FeedbackForm/hideFeedbackFormAction";
import { confirmFeedbackFormAction } from "../../store/FeedbackForm/confirmFeedbackFormAction";

const axios = require("axios");

const FeedbackForm = () => {

  const isFeedbackFormOpen = useSelector(feedbackFormOpen);
  const dispatch = useDispatch();

  const hideFeedbackForm = () => {
    dispatch(hideFeedbackFormAction);
  };

  const confirmFeedbackForm = () => {
    dispatch(confirmFeedbackFormAction);
  };

  const postFeedback = (feedbackObj) => {
    console.log(feedbackObj);
    axios.post("/api/feedbacks", feedbackObj)
      .catch((err) => console.error(err));
  };

  return (
    isFeedbackFormOpen === "open" ?
      <Formik
        validationSchema={
          object({
            name: string().required("введите Ваше имя").min(2, "слишком короткое имя").max(30, "слишком длинное имя"),
            phone: number("введите только цифры").required("введите номер телефона")
          })
        }
        initialValues={initialValues}
        onSubmit={(values) => {
          postFeedback(values);
          confirmFeedbackForm();
        }}
      >

        {({ errors, touched }) => (
          <div className="feedback-form__wrapper">
            <Form className='feedback-form'>
              <button className="feedback-form__exit-btn" onClick={() => {
                hideFeedbackForm();
              }}>&#215;</button>
              <label className="feedback-form__name-label">
                Имя
                <Field name='name' className='feedback-form__field'/>
                {touched.name && errors.name ?
                  <span className='error-message'> {errors.name}</span>
                  : null}
              </label>

              <label className="feedback-form__phone-label">
                Ваш номер
                <Field name='phone' className='feedback-form__field'/>
                {touched.phone && errors.phone ?
                  <span className='error-message'> {errors.phone}</span>
                  : null}
              </label>

              <label className="feedback-form__button-label">
                <Field name='send-button'
                       type='submit' value='Отправить' className='feedback-form__conf-button'
                />
              </label>
            </Form>
          </div>
        )}
      </Formik>
      : (isFeedbackFormOpen === "confirm") ?
      <div className="feedback-form__wrapper">
        <div className='feedback-form'>
          <button className="feedback-form__exit-btn" onClick={() => {
            hideFeedbackForm();
          }}>&#215;</button>
          <p className="feedback-form__conf-text1">Спасибо :)</p>
          <p className="feedback-form__conf-text2"> Мы свяжемся с вами в течении 5 минут !</p>
        </div>
      </div>
      : null
  );
};

export default FeedbackForm;
