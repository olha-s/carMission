import React from "react";
import { Formik, Form, Field } from "formik";
import "./FormItem.scss";
import AdminFormField from "../../AdminFormField/AdminFormField";
import axios from "axios";
import { saveErrObjAction } from "../../../../store/errorObject/saveErrObjAction";
import { openErrModal } from "../../../../store/ErrorModal/openErrModal";
import { useDispatch } from "react-redux";
import Button from "../../../generalComponents/Button/Button";
import { validationSchema } from "../validationSchema";
import { loadMainSection } from "../../../../store/appMainSections/operations";
import { toastr } from "react-redux-toastr";

const FormItem = ({ obj, sectionCreationStatus, setSectionCreationStatus }) => {
  const {
    heading,
    description,
    index,
    disabled,
    name,
    reactComponent,
    _id,
  } = obj;
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    if (sectionCreationStatus === "creating") {
      const sectionToServer = await axios({
        method: "POST",
        url: "/api/sections-main/",
        data: { ...values },
      }).catch((err) => {
        dispatch(saveErrObjAction(err));
        dispatch(openErrModal);
      });

      if (sectionToServer.status === 200) {
        setSectionCreationStatus("created");
        dispatch(loadMainSection());
        toastr.success(
          "Успешно",
          `Секция "${values.name}" создана в базе данных`
        );

      } else {
        toastr.warning("Хм...", "Что-то пошло не так");
      }
    } else {
      const updatedObj = { ...obj, ...values };

      const sectionToServer = await axios({
        method: "PUT",
        url: `/api/sections-main/${_id}`,
        data: updatedObj,
      }).catch((err) => {
        dispatch(saveErrObjAction(err));
        dispatch(openErrModal);
      });

      if (sectionToServer.status === 200) {
        // setIsUpdated(true);
        dispatch(loadMainSection());
        toastr.success(
          "Успешно",
          `Секция "${values.name}" изменена в базе данных`
        );
      } else {
        toastr.warning("Хм...", "Что-то пошло не так");
      }
    }
  };

  const deleteSection = async () => {
    const delSectionFromServer = await axios({
      method: "DELETE",
      url: `/api/sections-main/${_id}`,
    }).catch((err) => {
      dispatch(saveErrObjAction(err));
      dispatch(openErrModal);
    });
    if (delSectionFromServer.status === 200) {
      dispatch(loadMainSection());
      toastr.success("Успешно", `Секция "${name}" удалена в базе данных`);
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  return (
    <Formik
      initialValues={{
        heading,
        description,
        index,
        disabled,
        name,
        reactComponent,
      }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="admin__form-item">
          <AdminFormField
            className="admin__form-label"
            type="input"
            name="heading"
            errors={errors}
            labelName="Заголовок"
          />
          <AdminFormField
            className="admin__form-label"
            type="input"
            name="description"
            errors={errors}
            labelName="Описание"
            as="textarea"
          />
          <AdminFormField
            className="admin__form-label"
            type="input"
            name="index"
            errors={errors}
            labelName="Порядок при отображении"
          />
          <AdminFormField
            className="admin__form-label"
            type="input"
            name="name"
            errors={errors}
            labelName="Название секции"
          />

          <AdminFormField
            className="admin__form-label"
            type="input"
            name="reactComponent"
            errors={errors}
            labelName="Название реакт-компонента"
          />

          <label className="admin__form-label admin__input">
            <Field type="checkbox" name="disabled" />
            &nbsp;Скрыть секцию на странице
          </label>

          {sectionCreationStatus === "creating" ||
          sectionCreationStatus === "created" ? (
            <div className="admin__buttons-box">
              <Button
                className="admin__delete-btn"
                text="Cancel"
                onClick={(event) => {
                  event.preventDefault();
                  setSectionCreationStatus("no");
                }}
              />
              <Field
                type="submit"
                name="submit"
                className="admin__submit-btn"
                value="Submit"
              />
            </div>
          ) : (
            <div className="admin__buttons-box">
              <Button
                className="admin__delete-btn"
                text="Delete item"
                onClick={(event) => {
                  event.preventDefault();
                  deleteSection();
                }}
              />
              <Field
                type="submit"
                // disabled={isUpdated}
                name="submit"
                className="admin__submit-btn"
                value="Submit changes"
              />

            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FormItem;
