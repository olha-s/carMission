import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import axios from "axios";
import { saveErrObjAction } from "../../../../store/errorObject/saveErrObjAction";
import { openErrModal } from "../../../../store/ErrorModal/openErrModal";
import { useDispatch } from "react-redux";
import useUpdateTimeout from "../../../../utils/hooks/useUpdateTimeout";
import UpdateConfirmation from "../../updateConfirmation/UpdateConfirmation";
import { validationSchema } from "../ValidationSchema";

const FormItemWorkStages = ({ obj }) => {
  const { imgPath, title: propsTitle, text, isMain, _id: id } = obj;
  const title = text && !propsTitle ? text : propsTitle;
  const dispatch = useDispatch();
  const [isUpdated, setIsUpdated] = useState(false);
  const timeOut = useUpdateTimeout(setIsUpdated);

  useEffect(() => {
    return () => clearTimeout(timeOut);
  }, [timeOut]);

  const onSubmit = async (values) => {
    const updatedObj = isMain
      ? { ...obj, imgPath: values.imgPath, text: values.title }
      : { ...obj, ...values };

    const featureToServer = await axios({
      method: "PUT",
      url: `/api/features/${id}`,
      data: updatedObj,
    }).catch((err) => {
      dispatch(saveErrObjAction(err));
      dispatch(openErrModal);
    });

    if (featureToServer.status === 200) {
      setIsUpdated(true);
    }
  };

  return (
    <Formik
      initialValues={{ imgPath, title }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="admin__form-item">
          <AdminFormField
            className="admin__form-label"
            type="input"
            name="imgPath"
            errors={errors}
            labelName="Путь к картинке"
          />
          <AdminFormField
            as={isMain ? "textarea" : "input"}
            type={isMain ? "textarea" : "input"}
            fieldClassName={isMain ? "admin__form-textarea" : ""}
            name="title"
            errors={errors}
            labelName={isMain ? "Текстовый контент" : "Подпись к картинке"}
          />
          {isUpdated && <UpdateConfirmation />}
          <Field
            type="submit"
            disabled={isUpdated}
            name="submit"
            className="admin__submit-btn"
            value="Submit changes"
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemWorkStages;
