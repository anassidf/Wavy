import * as yup from "yup";
const phoneRegex = /(^(0){1}[7]{1}[7-9]{1}[0-9]{7}$)/g;
const userFormValidation = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Please Enter Your Phone Number!")
    .length(10, "Your Phone Number Should Be Exactly 10 Digits!")
    .matches(phoneRegex, "Please Enter a Valid Phone Number!"),
  dateOfBirth: yup.string().required("Please enter your Date of Birth"),
  address: yup.string().required("Please enter your Address "),
  brief: yup
    .string()
    .required("Please enter Brief About your self")
    .min(10, "Brief must be at least 10 characters long")
    .max(150, "Brief must be at most 150 characters long"),
});

export default userFormValidation;
