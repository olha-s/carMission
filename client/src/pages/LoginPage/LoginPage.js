import React from "react";
import { Form, Formik, Field } from "formik";
import "./LoginPage.scss";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveErrObjAction } from "../../store/errorObject/saveErrObjAction";
import { openErrModal } from "../../store/ErrorModal/openErrModal";
import { setIsAuth } from "../../store/auth/actions";

const initialValues = {
  login: "",
  password: "",
};

const loginSchema = yup.object().shape({
  login: yup.string().required("This is required field"),
  password: yup.string().required("This is required field"),
});

const LoginPage = () => {
  const dispatch = useDispatch();

  const loginSubmit = async (values) => {
    const res = await axios
      .post("/api/admin-users/login", { ...values })
      .catch((err) => {
        dispatch(saveErrObjAction(err));
        dispatch(openErrModal);
      });
    console.log(res);
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common.Authorization = res.data.token;
      dispatch(setIsAuth(true));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={loginSubmit}
      validationSchema={loginSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors }) => (
        <div className="login">
          <Form className="login__form">
            <Field
              className="login__field"
              name="login"
              placeholder="Введите логин"
            />
            <Field
              className="login__field"
              type="password"
              name="password"
              placeholder="Введите пароль"
            />
            <Field
              className="login__submit"
              type="submit"
              name="submit"
              value="Войти"
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;
