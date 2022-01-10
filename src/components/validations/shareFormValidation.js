import * as yup from "yup";

export const shareFormValidation = yup.object().shape({
<<<<<<< HEAD
  title: yup
    .string()
    .required("Please enter a title")
    .min(2, "Title must be at least 2 characters")
    .max(20, "Title must be at most 20 characters"),
  description: yup
    .string()
    .required("Please enter a description")
    .min(10, "Description must be at least 10 characters")
    .max(100, "Description must be at most 100 characters"),
=======
	title: yup
		.string()
		.required('Please enter a title')
		.min(2, 'Title must be at least 2 characters'),
	description: yup
		.string()
		.required('Please enter a description')
		.min(10, 'Description must be at least 10 characters')
		.max(100, 'Description must be at most 100 characters'),
>>>>>>> bfd2d9fd739677b0128846a030667a1467aaac8f
});
