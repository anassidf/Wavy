import * as yup from "yup";
export const becomeATourGuideValidation = yup.object().shape({
  city: yup.string().required("Please Choose Your City!"),
});
