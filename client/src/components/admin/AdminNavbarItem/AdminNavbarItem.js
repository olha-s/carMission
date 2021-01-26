import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../AdminFormField/AdminFormField";
import Button from "../../generalComponents/Button/Button";
import * as yup from "yup";
import { toastr } from "react-redux-toastr";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./AdminNavbarItem.scss";
import { addNewItem } from "../../../store/navbar/actions";
import { filterNavbarData } from "../../../store/navbar/operations";
import AdminNavbarSelect from "../AdminNavbarSelect/AdminNavbarSelect";
import PropTypes from "prop-types";

const navbarSchema = yup.object().shape({
    textContent: yup
        .string()
        .typeError("Введите текст")
        .min(2, "Слишком короткое название!")
        .max(50, "Слишком длинное название!")
        .required("Обязательное поле"),
    headerLocation: yup
        .string()
        .required("Обязательное поле"),
    footerLocation: yup
        .string()
        .required("Обязательное поле"),
    sectionId: yup
        .string()
        .required("Обязательное поле"),
});

const AdminNavarItem = ({
    className,
    textContent,
    textContentPlaceholder,
    headerLocation,
    headerLocationPlaceholder,
    footerLocation,
    footerLocationPlaceholder,
    id,
    contacts,
    sectionId,
    sectionIdPlaceholder,
    sectionsArr,
    numberInNavbar,
    sectionsNumberInNavbar,
    disabled,
    isNew
}) => {
    const dispatch = useDispatch();
    const [isDeleted, setIsDeleted] = useState(false);
    const [numberValue, setNumberValue] = useState(numberInNavbar);
    const [sectionIdValue, setSectionIdValue] = useState(sectionId);
    const [headerLocationValue, setHeaderLocationValue] = useState(headerLocation);
    const [footerLocationValue, setFooterLocationValue] = useState(footerLocation);
    const initialValues = contacts ? { textContent, contacts, headerLocation, footerLocation, numberInNavbar, sectionId } : { textContent, headerLocation, footerLocation, numberInNavbar, sectionId }

    const options = (name) => (
        name === "активна"
            ?
                [
                    { value: "true", label: "Секция неактивна на сайте" },
                    { value: "false", label: "Секция активна на сайте" }
                ]
            :
                [
                    { value: "left-side", label: "Слева от Лого" },
                    { value: "right-side", label: "Справа от Лого" },
                    { value: "non-active", label: `Неактивно в ${name}` }
                ]
    )
    
    const handleDeleteFromDB = async (e) => {
        e.preventDefault();
        const deleted = await axios
            .delete(`/api/navbar//${id}`)
            .catch((err) => {
            toastr.error(err.message);
        });
    
        if (deleted.status === 200) {
            toastr.success("Успешно", `Пункт "${textContent}" удалён из базы данных`);
            dispatch(filterNavbarData(id));
        } else {
            toastr.warning("Хм...", "Что-то пошло не так");
        }
    };
    const handleDeleteNew = (e) => {
        e.preventDefault();
        setIsDeleted(true);
        toastr.success("Успешно", "Айтем удалён до внесения в базу данных");
    };
    const handleUpdate = async (values) => {
        const updatedItem = await axios
            .put(`/api/navbar/${id}`, values)
            .catch((err) => {
            toastr.error(err.message);
        });
    
        if (updatedItem.status === 200) {
            toastr.success(
                "Успешно",
                `Пункт "${values.textContent}" изменён в базе данных`
            );
        } else {
            toastr.warning("Хм...", "Что-то пошло не так");
        }
    };
    const handlePostToDB = async (values) => {
        const newItem = await axios
            .post("/api/navbar/", values)
            .catch((err) => {
                toastr.error(err.message);
            });
    
        if (newItem.status === 200) {
            toastr.success("Успешно", `Пункт "${values.textContent}" добавлен в базу данных`);
            dispatch(addNewItem(newItem.data));
        } else {
            toastr.warning("Хм...", "Что-то пошло не так");
        }
    };
    
    if (isDeleted) {
        return null;
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={navbarSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={isNew ? handlePostToDB : handleUpdate}
        >
            {({ errors, setFieldValue, touched }) => (
                <Form className={`${className}__item`}>
                    {disabled ?
                        <label className={`${className}__info ${className}__info_none-active`}>Ceкция неактивна на сайте</label>
                        :
                        contacts ?
                            <label className={`${className}__info ${className}__info_active`}>Данный айтем вызывает открытие модального окна обратной связи</label>
                            :
                            isNew ?
                                <label className={`${className}__info ${className}__info_new-item`}>Новый айтем</label>
                                :
                                <label className={`${className}__info ${className}__info_active`}>Ceкция активна на сайте</label>
                    }

                    <AdminFormField
                        labelClassName={`${className}__label`}
                        fieldClassName={`${className}__input`}
                        errorClassName="admin-stages__form-error"
                        labelName="Название ccылки секции в меню"
                        type="input"
                        name="textContent"
                        placeholder={textContent || textContentPlaceholder}
                        errors={errors}
                    />

                    <label htmlFor="numberInNavbar" className={`${className}__label`}>
                        <span className={`${className}__number-text`}>Порядковый номер пункта в меню*</span>
                        <p className={`${className}__number-hidden`}>Проверьте уникален ли номер пункта, а также его расположение слева или справа от лого</p>
                    </label>
                    <AdminNavbarSelect
                        name="numberInNavbar"
                        className={className}
                        value={numberValue}
                        options={sectionsNumberInNavbar}
                        onChange={(value) => {
                            setNumberValue(value.value)
                            setFieldValue("numberInNavbar", value.value)
                            }}
                        errors={errors}

                    />

                    {contacts ?
                        <>
                            <p className={`${className}__contacts-hidden`}>Знаком "/" разделяются места переносa текста на новою строку</p>
                            <AdminFormField
                                labelClassName={`${className}__label`}
                                fieldClassName={`${className}__input`}
                                errorClassName="admin-stages__form-error"
                                labelName="Контактные данные*"
                                type="input"
                                name="contacts"
                                errors={errors}
                            />
                        </>
                        : null
                    }

                    {!contacts ?
                        <>
                            <label className={`${className}__label`}>К какой секции относится</label>
                            <AdminNavbarSelect
                                name="sectionId"
                                className={className}
                                value={sectionIdValue}
                                options={sectionsArr}
                                placeholder={sectionId || sectionIdPlaceholder}
                                onChange={(value) => {
                                    setSectionIdValue(value.value)
                                    setFieldValue("sectionId", value.value)
                                }}
                                errors={errors}
                            />
                        </>
                        : null
                    }

                    <label className={`${className}__label`}>Расположение в меню</label>
                    <AdminNavbarSelect
                        name="headerLocation"
                        className={className}
                        options={options("меню")}
                        placeholder={headerLocation || headerLocationPlaceholder}
                        value={headerLocationValue}
                        onChange={(value) => {
                            setHeaderLocationValue(value.value)
                            setFieldValue("headerLocation", value.value)
                        }}
                        errors={errors}
                    />

                    <label className={`${className}__label`}>Расположение в футере(подвале)</label>
                    <AdminNavbarSelect
                        name="footerLocation"
                        className={className}
                        value={footerLocationValue}
                        placeholder={footerLocation || footerLocationPlaceholder}
                        options={options("футере")}
                        onChange={(value) => {
                            setFooterLocationValue(value.value)
                            setFieldValue("footerLocation", value.value)
                        }}
                        errors={errors}
                    />
                    

                    <Field
                        type="submit"
                        name="submit"
                        className={`${className}__submit-btn`}
                        value={isNew ? "Создать новый пункт меню?" : "Подтвердить изменения"}
                    />
                    {!contacts ?
                        <Button
                            className={`${className}__delete-btn`}
                            text="&#10005;"
                            onClick={isNew ? handleDeleteNew : handleDeleteFromDB}
                        />
                        :
                        null
                    }
                </Form>
            )}
        </Formik>
    );
};


AdminNavarItem.propTypes = {
    className: PropTypes.string,
    textContent: PropTypes.string,
    textContentPlaceholder: PropTypes.string,
    headerLocation: PropTypes.string,
    headerLocationPlaceholder: PropTypes.string,
    footerLocation: PropTypes.string,
    footerLocationPlaceholder: PropTypes.string,
    id: PropTypes.string,
    contacts: PropTypes.string,
    sectionId: PropTypes.string,
    sectionIdPlaceholder: PropTypes.string,
    sectionsArr: PropTypes.array,
    numberInNavbar: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    sectionsNumberInNavbar: PropTypes.array,
    disabled: PropTypes.bool,
    isNew:  PropTypes.bool,
};

AdminNavarItem.defaultTypes = {
    className: "",
    textContent: "",
    textContentPlaceholder: "Введите название секции",
    headerLocation: "",
    headerLocationPlaceholder: "Выберите расположение",
    footerLocation: "",
    footerLocationPlaceholder: "Выберите расположение",
    id: "",
    contacts: "",
    sectionId: "",
    sectionIdPlaceholder: "Выберите секцию",
    sectionsArr: [],
    numberInNavbar: "",
    sectionsNumberInNavbar: "",
    disabled: true,
    isNew:  false,
};



export default AdminNavarItem;