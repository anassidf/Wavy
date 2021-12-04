import { Link } from 'react-router-dom';
import regesterSVG from '../assets/regesterSVG.svg';
import GoogleApi from './GoogleApi';

const Registration = () => {
	return (
		<div className='h-screen bg-gray-300 flex '>
			<div className='w-full relative flex justify-center items-center bg-signUp bg-center bg-cover'>
				<div className='bg-black h-full w-full opacity-40'></div>
			</div>
			<div className='bg-share_color w-full'>
				{/* form container */}

				<form className='flex flex-col space-y-6 justify-center items-center h-full '>
					<input
						type='text'
						placeholder='Username'
						className='py-2 w-96  rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest text-lg '
					/>
					<input
						type='email'
						placeholder='Email'
						className='py-2 w-96 rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest text-lg '
					/>
					<input
						type='password'
						placeholder='Password'
						className='py-2 w-96 rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest text-lg '
					/>
					<button className='bg-pink-600 text-white rounded-full w-96 py-2  hover:shadow-xl font-bold shadow-md transition-all ease-in-out duration-300 hover:bg-opacity-80 '>
						Sign Up
					</button>
					<GoogleApi action='sign up' />
					<Link to='/login' className=''>
						<h1 className='text-blue-700 '>
							If you already have an account Login
						</h1>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Registration;
