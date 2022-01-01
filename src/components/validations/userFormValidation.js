import * as yup from 'yup';

const userFormValidation = yup.object().shape({
	phoneNumber: yup
		.string()
		.required('Please enter your Phone Number')
		.min(9, 'Phone Number must be at least 10 digits long')
		.max(9, 'Phone Number must be at most 10 digits long'),
	dateOfBirth: yup.string().required('Please enter your Date of Birth'),
	address: yup.string().required('Please enter your Address '),
	brief: yup
		.string()
		.required('Please enter Brief of your self')
		.min(50, 'Brief must be at least 50 characters long')
		.max(150, 'Brief must be at most 150 characters long'),
});

export default userFormValidation;
