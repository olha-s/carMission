import React from "react";
import { Field } from "formik";

const AdminFormField = ({ name, errors, type, labelName, className }) => {
  return (
    <label className={className}>
      <span style={{ display: "block" }}>{labelName}</span>
      <Field name={name} type={type} className="admin__input" />
      {errors.name && <span>{errors.name}</span>}
    </label>
  );
};

export default AdminFormField;
