import { useState } from 'react';
import { Link } from 'react-router-dom';
import regesterSVG from '../assets/regesterSVG.svg';
import GoogleApi from './GoogleApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { regestrationSchema } from './validations/regestrationValidation';
/* import emailImage from '../assets/email.png';
import userImage from '../assets/user.png';
import lockImage from '../assets/security.png'; */
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Toaster, toast } from 'react-hot-toast';
const Registration = () => {
	const regestrationData = async (values) => {
		/* here is the function that takes the form data and regester the account and later on we should add redirection to the profile page whenever the profile become ready  */
		await createUserWithEmailAndPassword(auth, values.email, values.password)
			.then(() => {
				/* toast.success('Congratulation you are regestered'); */
			})
			.catch((error) => {
				console.log(error.message);
				toast.error('This account is already regestered try another email');
			});
	};

	return (
		<div className='h-screen bg-gray-300 flex '>
			<div className='w-full relative hidden lg:inline-flex bg-signUp bg-center bg-cover'>
				<div className='bg-black h-full w-full opacity-40'></div>
			</div>
			<Formik
				initialValues={{ username: '', email: '', password: '' }}
				validationSchema={regestrationSchema}
				onSubmit={regestrationData}>
				<div className='bg-share_color w-full'>
					{/* form container */}

					<Form className='flex flex-col  justify-center items-center h-full relative '>
						<div className='relative text-left'>
							<Field
								autoComplete='off'
								type='text'
								placeholder='Username'
								name='username'
								className='mt-6 sm:py-2 sm:w-96 py-1.5 w-72  rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm'
							/>
							<ErrorMessage
								component='div'
								name='username'
								className='text-red-500 text-xs text-left mt-2 ml-5  '
							/>
						</div>
						<div className='relative text-left'>
							<Field
								autoComplete='off'
								type='email'
								placeholder='Email'
								name='email'
								className='mt-6 sm:py-2 sm:w-96 py-1.5 w-72 rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm'
							/>
							<ErrorMessage
								component='div'
								name='email'
								className='text-red-500 text-xs text-left mt-2 ml-5'
							/>
						</div>
						<div className='relative text-left'>
							<Field
								autoComplete='off'
								type='password'
								placeholder='Password'
								name='password'
								className='mt-6 sm:py-2 sm:w-96 py-1.5 w-72 rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
							/>
							<ErrorMessage
								component='div'
								name='password'
								className='text-red-500 text-xs text-left mt-2 ml-5'
							/>
						</div>
						<button
							/* onClick={signUp} */
							className='mt-6 bg-pink-600 text-white rounded-full sm:py-2 sm:w-96 py-1.5 w-72  hover:shadow-xl font-bold shadow-md transition-all ease-in-out duration-300 hover:bg-opacity-80 sm:text-lg text-sm'>
							Sign Up
						</button>

						<GoogleApi action='sign up' />
						<Link to='/login'>
							<h1 className='text-blue-700 text-sm sm:text-lg mt-6'>
								If you already have an account Login
							</h1>
						</Link>
					</Form>
				</div>
			</Formik>
			<Toaster position='top-right' />
		</div>
	);
};

export default Registration;
