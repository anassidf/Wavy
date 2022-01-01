import * as yup from "yup";
import { string } from "yup/lib/locale";
const phoneRegex = /(^(0){1}[7]{1}[7-9]{1}[0-9]{7}$)/g;
export const editFormValidations = yup.object().shape({
  fullName: yup
    .string()
    .required("Please Enter Your Full Name!")
    .min(3, "Your Full Name Should Be More Than 3 Characters!")
    .max(30, "Your Full Name Should Be Less Than 30 Characters!"),
  businessEmail: yup
    .string()
    .email("Please Enter a Valid Email!")
    .required("Please Enter Your Email!"),
  date: yup
    .date()
    .required("Please Enter your Birth Date!")
    .max("2004/1/1", "the age should be more than 18!"),
  status: yup.string().required("Please Choose Your Status!"),
  city: yup.string().required("Please Choose Your City!"),
  phoneNumber: yup
    .string()
    .required("Please Enter Your Phone Number!")
    .length(10, "Your Phone Number Should Be Exactly 10 Digits!")
    .matches(phoneRegex, "Please Enter a Valid Phone Number!"),
  description: yup
    .string()
    .required("Please Enter a Description!")
    .min(10, "Write More About Your Self!")
    .max(150, "The Maximum Characters is 150!"),
});
