import React from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import AdminFormField from "../../AdminFormField/AdminFormField";
import { updateSocialNetworkNewObject } from "../../../../store/socialNetworks/operations";
import * as yup from "yup";
import { toastr } from "react-redux-toastr";
import "./FormItemSocialNetworks.scss";
import { addNewSocialNetworks } from "../../../../store/socialNetworks/actions";
import PropTypes from "prop-types";
import { checkIsInputNotChanges } from "../../../../utils/functions/checkIsInputNotChanges";

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
});

const FormItemSocialNetworks = ({
  sourceObj,
  isNew,
  children,
  put,
  post,
  uploadToS3,
  file,
  className,
}) => {
  const dispatch = useDispatch();
  const { isEnabled, name, url, iconSrc, namePlaceholder, urlPlaceholder, iconSrcPlaceholder } = sourceObj;

  const postItemToDB = async (values) => {
    if (values.iconSrc || file) {
      const newItem = await post(values);

      if (newItem.status === 200) {
        if (file) {
          await uploadToS3(values, newItem.data._id);
        }

        dispatch(addNewSocialNetworks({ ...newItem.data, iconSrc: values.iconSrc }));
        toastr.success(
          "Успешно",
          `В базу данны добавлена новая соцсеть - "${values.name}`
        );
      } else {
        toastr.warning("Хм...", "Что-то пошло не так");
      }
    } else {
      toastr.warning("Warning", "Не добавлено изображение или путь к нему");
    }
  };

  const updateItem = async (values) => {
    const updatedObj = {
      ...sourceObj,
      ...values,
    };
    const updatedItem = await put(updatedObj);

    if (updatedItem.status === 200) {
      dispatch(updateSocialNetworkNewObject(updatedItem.data));
      toastr.success(
        "Успешно",
        `Внесены изменения соцсети "${values.name}" в базе данных`
      );
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };
  
  const update = (values) => {
    if (file && checkIsInputNotChanges(values, sourceObj)) {
      uploadToS3(values, sourceObj._id);
    } else if (!file && !checkIsInputNotChanges(values, sourceObj)) {
      updateItem(values);
    } else if (file && !checkIsInputNotChanges(values, sourceObj)) {
      uploadToS3(values, sourceObj._id).then(() => updateItem(values));
    } else {
      toastr.warning("Сообщение", "Ничего не изменилось");
    }
  };
  
  return (
    <Formik
      initialValues={{ name, url, iconSrc, isEnabled: isEnabled }}
      validationSchema={socialNetworksSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={isNew ? postItemToDB : update}
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

          <label className={`${className}__form-label`}>
            Отображение соцсети на сайте
          </label>
          <div className={`${className}__form-toggle`}>
            <Field
              className={`${className}__form-field`}
              type="checkbox"
              name="isEnabled"
            />
            {values.isEnabled ? (
              <span className={`${className}__active`}>Активна на сайте</span>
            ) : (
              <span className={`${className}__none-active`}>
                Неактивна на сайте
              </span>
            )}
          </div>
          {children}

          <Field
            type="submit"
            name="submit"
            className={`${className}__submit-btn`}
            value={
              isNew ? "Создать новую соц-сеть?" : "Подтвердить изменения"
            }
          />
        </Form>
      )}
    </Formik>
  );
};

FormItemSocialNetworks.propTypes = {
  className: PropTypes.string,
  sourceObj: PropTypes.object,
  isNew: PropTypes.bool,
  // children,
  // put,
  // post,
  // uploadToS3,
  // file,

};

FormItemSocialNetworks.defaultTypes = {
  isNew: false,
  className: "",
  sourceObj: {},
  // children,
  // put,
  // post,
  // uploadToS3,
  // file,

};

export default FormItemSocialNetworks;
