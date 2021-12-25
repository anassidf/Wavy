import { Link } from 'react-router-dom';
import GoogleApi from './GoogleApi';
import { loginSchema } from './validations/regestrationValidation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
	const loginData = (values) => {
		console.log(values);
		signInWithEmailAndPassword(auth, values.email, values.password)
			.then(() => {
				/* 	toast.success('You are loged in'); */
			})
			.catch((error) => {
				console.log(error.message);
				toast.error('Something went wrong');
			});
	};
	return (
		<div className='h-screen bg-gray-300 flex '>
			<div className='w-full relative hidden lg:inline-flex bg-login bg-cover bg-center'>
				<div className='bg-black h-full w-full opacity-40'></div>
			</div>
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={loginSchema}
				onSubmit={loginData}>
				<div className='bg-share_color w-full'>
					{/* form container */}

					<Form className='flex flex-col justify-center items-center h-full '>
						<div className='relative text-left'>
							<Field
								name='email'
								autoComplete='off'
								type='email'
								placeholder='Email'
								className='mt-6 sm:py-2 sm:w-96 py-1.5 w-72 rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
							/>
							<ErrorMessage
								component='div'
								name='email'
								className='text-red-500 text-xs text-left mt-2 ml-5'
							/>
						</div>
						<div className='relative text-left'>
							<Field
								name='password'
								autoComplete='off'
								type='password'
								placeholder='Password'
								className='mt-6 sm:py-2 sm:w-96 py-1.5 w-72 rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
							/>
							<ErrorMessage
								component='div'
								name='password'
								className='text-red-500 text-xs text-left mt-2 ml-5'
							/>
						</div>
						<button className='mt-6 bg-pink-600 text-white rounded-full sm:py-2 sm:w-96 py-1.5 w-72 font-bold shadow-md transition-all ease-in-out duration-300 hover:bg-opacity-80   hover:shadow-xl text-sm sm:text-lg'>
							Login
						</button>
						<GoogleApi action='login' />
						<Link to='/registration' className=''>
							<h1 className='text-blue-700 text-sm sm:text-lg mt-6'>
								If you dont have an account Sign Up
							</h1>
						</Link>
					</Form>
				</div>
			</Formik>
			<Toaster position='top-right' />
		</div>
	);
};

export default Login;
