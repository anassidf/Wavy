import * as yup from 'yup';

export const shareFormValidation = yup.object().shape({
	title: yup
		.string()
		.required('Please enter a title')
		.min(2, 'Title must be at least 2 characters'),
	description: yup
		.string()
		.required('Please enter a description')
		.min(10, 'Description must be at least 10 characters')
		.max(100, 'Description must be at most 100 characters'),
});
