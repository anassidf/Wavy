import { Link } from 'react-router-dom';
import GoogleApi from './GoogleApi';

const Login = () => {
	return (
		<div className='h-screen bg-gray-300 flex '>
			<div className='w-full relative flex justify-center items-center bg-login bg-cover bg-center'>
				<div className='bg-black h-full w-full opacity-40'></div>
			</div>
			<div className='bg-share_color w-full'>
				{/* form container */}

				<form className='flex flex-col space-y-6 justify-center items-center h-full '>
					<input
						type='text'
						placeholder='Email'
						className='py-2 w-96 rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest text-lg '
					/>
					<input
						type='password'
						placeholder='Password'
						className='py-2 w-96 rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest text-lg '
					/>
					<button className='bg-pink-600 text-white rounded-full w-96 py-2 font-bold shadow-md transition-all ease-in-out duration-300 hover:bg-opacity-80   hover:shadow-xl'>
						Login
					</button>
					<GoogleApi action='login' />
					<Link to='/registration' className=''>
						<h1 className='text-blue-700 '>
							If you dont have an account Sign Up
						</h1>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Login;
