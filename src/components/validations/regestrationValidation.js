import * as yup from 'yup';

export const regestrationSchema = yup.object().shape({
	username: yup.string().required('Please enter your username'),
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Please enter your email'),
	password: yup
		.string()
		.required('Please enter your password')
		.min(6, 'Password must be at least 6 characters long'),
});

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Please enter your email'),
	password: yup
		.string()
		.required('Please enter your password')
		.min(6, 'Password must be at least 6 characters long'),
});
