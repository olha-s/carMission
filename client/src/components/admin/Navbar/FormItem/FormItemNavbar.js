import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import * as yup from "yup";
import { toastr } from "react-redux-toastr";
import { useDispatch } from "react-redux";
import "./FormItemNavbar.scss";
import { updateNavbarDataByNewObject } from "../../../../store/navbar/operations";
import FormItemNavbarSelect from "../FormItemNavbarSelect";
import PropTypes from "prop-types";
import { checkIsInputNotChanges } from "../../../../utils/functions/checkIsInputNotChanges";
import { addNewItem } from "../../../../store/navbar/actions";

const navbarSchema = yup.object().shape({
  textContent: yup
    .string()
    .typeError("Введите текст")
    .min(2, "Слишком короткое название!")
    .max(50, "Слишком длинное название!")
    .required("Обязательное поле"),
  headerLocation: yup.string().required("Обязательное поле"),
  footerLocation: yup.string().required("Обязательное поле"),
  numberInNavbar: yup.string().required("Обязательное поле"),

});

const FormItemNavbar = ({
  sourceObj,
  className,
  sectionsNumbersInNavbar,
  sectionsArr,
  isNew,
  children,
  put,
  post,
}) => {
  const dispatch = useDispatch();
  const {
    numberInNavbar,
    textContent,
    textContentPlaceholder,
    headerLocation,
    headerLocationPlaceholder,
    footerLocation,
    footerLocationPlaceholder,
    contacts,
    sectionId,
    sectionIdPlaceholder,
    disabled,
  } = sourceObj;
  const [numberValue, setNumberValue] = useState(numberInNavbar);
  const [sectionIdValue, setSectionIdValue] = useState(sectionId);
  const [headerLocationValue, setHeaderLocationValue] = useState(headerLocation);
  const [footerLocationValue, setFooterLocationValue] = useState(footerLocation);
  const initialValues = contacts
    ? {
        textContent,
        contacts,
        headerLocation,
        footerLocation,
        numberInNavbar,
        sectionId,
      }
    : {
        textContent,
        headerLocation,
        footerLocation,
        numberInNavbar,
        sectionId,
      };

  const options = (name) => (
    [
      { value: "left-side", label: "Слева от Лого" },
      { value: "right-side", label: "Справа от Лого" },
      { value: "non-active", label: `Неактивно в ${name}` },
  ]);

  const postToDB = async (values) => {
    const newItem = await post(values);

    if (newItem.status === 200) {

      dispatch(addNewItem(newItem.data));
      toastr.success(
        "Успешно",
        `Пункт "${values.textContent}" добавлен в базу данных`
      );
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const updateNavbarItem = async (values) => {
    const updatedObj = {
      ...sourceObj,
      ...values,
    };
    const updatedItem = await put(updatedObj);

    if (updatedItem.status === 200) {
      dispatch(updateNavbarDataByNewObject(updatedItem.data));
      toastr.success(
        "Успешно",
        `Пункт "${values.textContent}" изменён в базе данных`
      );
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const update = (values) => {
    if (!checkIsInputNotChanges(values, sourceObj)) {
      updateNavbarItem(values);
    } else {
      toastr.warning("Сообщение", "Ничего не было изменено");
    }
  };


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={navbarSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={isNew ? postToDB : update}
    >
      {({ errors, setFieldValue, touched }) => (
        <Form className={`${className}__item`}>
          {disabled ? (
            <label className={`${className}__info ${className}__info_none-active`}>
              Пункт неактивен на сайте
            </label>
          ) : contacts ? (
            <label className={`${className}__info ${className}__info_active`}>
              Уникальный пункт с контактными данными
            </label>
          ) : isNew ? (
            <label className={`${className}__info ${className}__info_new-item`}>
              Новый пункт меню
            </label>
          ) : headerLocation === "non-active" && footerLocation === "non-active" ? (
            <label className={`${className}__info ${className}__info_none-active`}>
              Пункт неактивен на сайте
            </label>
          ) : (
            <label className={`${className}__info ${className}__info_active`}>
              Пункт активен на сайте
            </label>
          )}

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
            <span className={`${className}__number-text`}>
              Порядковый номер пункта в меню*
            </span>
            <p className={`${className}__number-hidden`}>
              Проверьте уникален ли номер пункта, а также его расположение слева
              или справа от лого
            </p>
          </label>
          <FormItemNavbarSelect
            name="numberInNavbar"
            className={className}
            value={numberValue}
            options={sectionsNumbersInNavbar}
            onChange={(value) => {
              setNumberValue(value.value);
              setFieldValue("numberInNavbar", value.value);
            }}
            errors={errors}
          />

          {contacts ? (
            <>
              <AdminFormField
                labelClassName={`${className}__label`}
                fieldClassName={`${className}__input`}
                errorClassName="admin-stages__form-error"
                labelName="Контактные данные"
                type="input"
                name="contacts"
                errors={errors}
              />
            </>
          ) : null}

          {!contacts ? (
            <>
              <label className={`${className}__label`}>
                К какой секции относится(если требуется)
              </label>
              <FormItemNavbarSelect
                name="sectionId"
                className={className}
                value={sectionIdValue}
                options={sectionsArr}
                placeholder={sectionId || sectionIdPlaceholder}
                onChange={(value) => {
                  setSectionIdValue(value.value);
                  setFieldValue("sectionId", value.value);
                }}
                errors={errors}
              />
            </>
          ) : null}

          <label className={`${className}__label`}>Расположение в меню</label>
          <FormItemNavbarSelect
            name="headerLocation"
            className={className}
            options={options("меню")}
            placeholder={headerLocation || headerLocationPlaceholder}
            value={headerLocationValue}
            onChange={(value) => {
              setHeaderLocationValue(value.value);
              setFieldValue("headerLocation", value.value);
            }}
            errors={errors}
          />

          <label className={`${className}__label`}>
            Расположение в футере(подвале)
          </label>
          <FormItemNavbarSelect
            name="footerLocation"
            className={className}
            value={footerLocationValue}
            placeholder={footerLocation || footerLocationPlaceholder}
            options={options("футере")}
            onChange={(value) => {
              setFooterLocationValue(value.value);
              setFieldValue("footerLocation", value.value);
            }}
            errors={errors}
          />
          {contacts ? null : children}
          <Field
            type="submit"
            name="submit"
            className={`${className}__submit-btn`}
            value={
              isNew ? "Создать новый пункт меню?" : "Подтвердить изменения"
            }
          />
        </Form>
      )}
    </Formik>
  );
};

FormItemNavbar.propTypes = {
  className: PropTypes.string,
  sourceObj: PropTypes.object,
  sectionsArr: PropTypes.array,
  sectionsNumbersInNavbar: PropTypes.array,
  isNew: PropTypes.bool,
};

FormItemNavbar.defaultTypes = {
  className: "",
  sourceObj: {},
  sectionsArr: [],
  sectionsNumbersInNavbar: [],
  disabled: true,
  isNew: false,
};

export default FormItemNavbar;
