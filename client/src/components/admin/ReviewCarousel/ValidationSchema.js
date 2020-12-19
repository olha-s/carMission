import * as yup from "yup";

export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Required field!")
    .min(3)
    .max(50, "Length err! String must contain 3-50 chars"),
  customerPhoto: yup
    .string()
    .required("Required field!")
    .min(15)
    .max(50, "Length err! String must contain 15-50 chars"),
  customerName: yup
    .string()
    .required("Required field!")
    .min(2, "Minimum length is 2 symbols"),
  carInfo: yup
    .string()
    .required("Required field!")
    .min(2, "Minimum length is 2 symbols"),
  reviewText: yup
    .string()
    .required("Required field!")
    .min(2, "Minimum length is 2 symbols")
    .max(100, "Length err! String must contain 2-100 chars"),
});
