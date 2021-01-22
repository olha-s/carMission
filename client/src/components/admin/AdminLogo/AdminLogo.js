import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { toastr } from "react-redux-toastr";
import { useSelector } from "react-redux";
import "./AdminLogo.scss";
import { getLogoData } from "../../../store/logo/selectors";
import AdminFormField from "../AdminFormField/AdminFormField";
import axios from "axios";


const logoSchema = yup.object().shape({
    path: yup
        .string("Введите текст")
        .strict(true)
        .typeError("Введите текст")
        .required("Обязательное поле"),
})

const AdminLogo = () => {
    const mainClassName = "admin-logo";
    const data = useSelector(getLogoData);
    const path = data.path;
    const id = data._id;

    const updateLogoData = async (values) => {
        const updatedItem = await axios
            .put(`/api/logo/${id}`, values)
            .catch((err) => {
            toastr.error(err.message);
        });
    
        if (updatedItem.status === 200) {
            toastr.success(
                "Успешно",
                "Лого изменёно"
            );
        } else {
            toastr.warning("Хм...", "Что-то пошло не так");
        }

    }

    return (
        <Formik
            initialValues={{path}}
            validationSchema={logoSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={updateLogoData}
        >
            {({ errors, touched, values }) => (
                <Form className={`${mainClassName}__form-item`}>
                    <AdminFormField
                        labelClassName={`${mainClassName}__form-label`}
                        fieldClassName={`${mainClassName}__form-input`}
                        errorClassName={`${mainClassName}__form-error`}
                        labelName="Путь к лого компании"
                        type="input"
                        name="path"
                        placeholder={path}
                        errors={errors}
                    />
                    <Field
                        type="submit"
                        name="submit"
                        className={`${mainClassName}__submit-btn`}
                        value="Подтвердить изменения"
                    />

                </Form>
            )}
        </Formik>
    );
};

export default AdminLogo;