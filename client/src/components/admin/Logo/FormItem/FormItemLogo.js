import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { toastr } from "react-redux-toastr";
import "./FormItemLogo.scss";
import AdminFormField from "../../AdminFormField/AdminFormField";
import { checkIsInputNotChanges } from "../../../../utils/functions/checkIsInputNotChanges";
import { updateLogoData } from "../../../../store/logo/actions";
import { useDispatch } from "react-redux";


const logoSchema = yup.object().shape({
    iconSrc: yup
        .string("Введите текст")
        .strict(true)
        .typeError("Введите текст")
        .required("Обязательное поле"),
})

const FormItemLogo = ({
    sourceObj,
    children,
    put,
    uploadToS3,
    file,
    className,
  
}) => {
    const { iconSrc } = sourceObj;
    const dispatch = useDispatch();

    const updateLogoState = async (values) => {
        const updatedObj = {
            ...sourceObj,
            ...values,
          };
          const updatedItem = await put(updatedObj);
      
          if (updatedItem.status === 200) {
            dispatch(updateLogoData(updatedItem.data));
            toastr.success(
                "Успешно",
                "Лого изменёно"
        );
          } else {
            toastr.warning("Хм...", "Что-то пошло не так");
          }
    }

    const update = (values) => {
        if (file && checkIsInputNotChanges(values, sourceObj) || file && !checkIsInputNotChanges(values, sourceObj)) {
            uploadToS3(values, sourceObj._id).then(() => updateLogoState(values));
        } else if (!file && !checkIsInputNotChanges(values, sourceObj)) {
          updateLogoState(values);
        } else {
          toastr.warning("Сообщение", "Ничего не изменилось");
        }
      };
    

    return (
        <Formik
            initialValues={{iconSrc}}
            validationSchema={logoSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={update}
        >
            {({ errors }) => (
                <Form className={`${className}__form-item`}>
                    <AdminFormField
                        labelClassName={`${className}__form-label`}
                        fieldClassName={`${className}__form-input`}
                        errorClassName={`${className}__form-error`}
                        labelName="Путь к лого компании"
                        type="input"
                        name="iconSrc"
                        placeholder={iconSrc}
                        errors={errors}
                    />
                    {children}
                    <Field
                        type="submit"
                        name="submit"
                        className={`${className}__submit-btn`}
                        value="Подтвердить изменения"
                    />

                </Form>
            )}
        </Formik>
    );
};

export default FormItemLogo;