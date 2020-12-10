import * as yup from "yup";

export const validationSchema = yup.object().shape({
  imgPath: yup
    .string()
    .required("Required field!")
    .min(15)
    .max(50, "Length err! String must contain 15-50 chars"),
  title: yup
    .string()
    .required("Required field!")
    .min(15)
    .max(600, "Length err! String must contain 15-600 chars"),
});
