import { useState } from 'react';
import { Link } from 'react-router-dom';
import regesterSVG from '../assets/regesterSVG.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { regestrationSchema } from './validations/regestrationValidation';
/* import emailImage from '../assets/email.png';
import userImage from '../assets/user.png';
import lockImage from '../assets/security.png'; */
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Toaster, toast } from 'react-hot-toast';
import GoogleApiSignUp from './GoogleApiSignUp';
const Registration = () => {
	return (
		<div className='h-screen bg-gray-300 flex  justify-center items-center'>
			<div className='bg-signUp bg-center bg-cover  h-screen absolute top-0 right-0 left-0 '>
				<div className='bg-black absolute top-0 left-0 right-0  h-full bg-opacity-50'></div>
			</div>

			<div className='z-10 bg-blue-200 flex flex-col  justify-center items-center h-super_larg_height2 w-additional_user_data2 lg:w-additional_user_data1   rounded-lg shadow-lg bg-opacity-80 relative '>
				<GoogleApiSignUp />
				<Link to='/login'>
					<h1 className='text-blue-700 text-sm sm:text-lg mt-6'>
						If you already have an account Login
					</h1>
				</Link>
			</div>
		</div>
	);
};

export default Registration;
