import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import AdminFormField from "../AdminFormField/AdminFormField";
import { filterSocialNetworks } from "../../../store/socialNetworks/operations";
import * as yup from "yup";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import Button from "../../generalComponents/Button/Button";
import "./AdminSocialNetworksItem.scss";
import { addNewSocialNetworks } from "../../../store/socialNetworks/actions";
import PropTypes from "prop-types";


const socialNetworksSchema = yup.object().shape({
    name: yup
        .string("Введите текст")
        .strict(true)
        .typeError("Введите текст")
        .required("Обязательное поле"),
    url: yup
        .string("Введите текст")
        .strict(true)
        .typeError("Введите текст")
        .required("Обязательное поле"),
    iconSrc: yup
        .string("Введите текст")
        .strict(true)
        .typeError("Введите текст")
        .required("Обязательное поле"),
});

const AdminSocialNetworksItem = ({
    isEnabled, name, id, url, iconSrc, isNew, className, namePlaceholder, urlPlaceholder, iconSrcPlaceholder
}) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const dispatch = useDispatch();

    const postItemToDB = async (values) => {
        console.log(values)
        const newItem = await axios
            .post("/api/social-networks/", values)
            .catch((err) => {
                toastr.error(err.message);
            });
    
        if (newItem.status === 200) {
            toastr.success("Успешно", `В базу данны добавлена новая соцсеть - "${values.name}"`);
            dispatch(addNewSocialNetworks(newItem.data));
        } else {
            toastr.warning("Хм...", "Что-то пошло не так");
        }
    };
    const updateItem = async (values) => {
        console.log(values);
        const updatedItem = await axios
            .put(`/api/social-networks/${id}`, values)
            .catch((err) => {
            toastr.error(err.message);
        });
    
        if (updatedItem.status === 200) {
            toastr.success(
                "Успешно",
                `Внесены изменения соцсети "${values.name}" в базе данных`
            );
        } else {
            toastr.warning("Хм...", "Что-то пошло не так");
        }
    };
    const deleteNewItem = (e) => {
        e.preventDefault();
        setIsDeleted(true);
        toastr.success("Успешно", "Соцсеть удалёнa до внесения в базу данных");
    };
    const deleteItemFromDB = async (e) => {
        e.preventDefault();
        const deleted = await axios
        .delete(`/api/social-networks/${id}`)
        .catch((err) => {
            toastr.error(err.message);
        });
        
        if (deleted.status === 200) {
            toastr.success("Успешно", `Соцсеть "${name}" удалёнa из базы данных`);
            dispatch(filterSocialNetworks(id));
        } else {
            toastr.warning("Хм...", "Что-то пошло не так");
        }
    };
    
    if (isDeleted) {
        return null;
    }

    return (
        <Formik
            initialValues={{ name, url, iconSrc, isEnabled: isEnabled }}
            validationSchema={socialNetworksSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={isNew ? postItemToDB : updateItem}
        >
            {({ errors, touched, values }) => (
                <Form className={`${className}__form-item`}>
                    <AdminFormField
                        labelName="Cоцсеть"
                        name="name"
                        type="text"
                        labelClassName={`${className}__form-label`}
                        fieldClassName={`${className}__form-input`}
                        errorClassName={`${className}__form-error`}
                        placeholder={name || namePlaceholder}
                        errors={errors}
                    />
                    <AdminFormField
                        labelName="Ссылка на аккаунт"
                        name="url"
                        type="text"
                        labelClassName={`${className}__form-label`}
                        fieldClassName={`${className}__form-input`}
                        errorClassName={`${className}__form-error`}
                        placeholder={url || urlPlaceholder}
                        errors={errors}

                    />
                    <AdminFormField
                        labelName="Ссылка на иконку"
                        name="iconSrc"
                        type="text"
                        labelClassName={`${className}__form-label`}
                        fieldClassName={`${className}__form-input`}
                        errorClassName={`${className}__form-error`}
                        errors={errors}
                        placeholder={iconSrc || iconSrcPlaceholder}
                    />

                    <label className={`${className}__form-label`}>Отображение соцсети на сайте</label>
                    <div className={`${className}__form-toggle`}>
                        <Field
                            className={`${className}__form-field`}
                            type="checkbox"
                            name="isEnabled"
                        />
                        {values.isEnabled ?
                            <span className={`${className}__active`}>Активна на сайте</span>
                            :
                            <span className={`${className}__none-active`}>Неактивна на сайте</span>
                        }
                    </div>

                    <Field
                        type="submit"
                        name="submit"
                        className={`${className}__submit-btn`}
                        value={isNew ? "Создать новый пункт меню?" : "Подтвердить изменения"}
                    />
                    <Button
                        className={`${className}__delete-btn`}
                        text="&#10005;"
                        onClick={isNew ? deleteNewItem : deleteItemFromDB}
                    />
                </Form>
            )}
        </Formik>
    );
};

AdminSocialNetworksItem.propTypes = {
    isEnabled: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string,
    url: PropTypes.string,
    iconSrc: PropTypes.string,
    isNew: PropTypes.bool,
    className: PropTypes.string,
    namePlaceholder: PropTypes.string,
    urlPlaceholder: PropTypes.string,
    iconSrcPlaceholder: PropTypes.string,
}

AdminSocialNetworksItem.defaultTypes = {
    isEnabled: true,
    name: "",
    id: "",
    url: "",
    iconSrc: "",
    isNew: false,
    className: "",
    namePlaceholder: "",
    urlPlaceholder: "",
    iconSrcPlaceholder: "",
}


export default AdminSocialNetworksItem;