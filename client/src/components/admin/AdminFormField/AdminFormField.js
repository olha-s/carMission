import React from "react";
import { Field } from "formik";

const AdminFormField = ({
  as,
  name,
  errors,
  type,
  labelName,
  className,
  fieldClassName,
}) => {
  return (
    <label className={className}>
      <span style={{ display: "block" }}>{labelName}</span>
      <Field
        as={as}
        name={name}
        type={type}
        className={
          fieldClassName ? `admin__input ${fieldClassName}` : "admin__input"
        }
      />
      {errors.name && <span>{errors.name}</span>}
    </label>
  );
};

export default AdminFormField;
