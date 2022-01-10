import * as yup from "yup";
export const reviewFormValidation = yup.object().shape({
  description: yup
    .string()
    .required("Please Enter a Review!")
    .min(10, "Write More About This Tour Guide!")
    .max(150, "The Maximum Characters is 150!"),
});
