import React from 'react';

const UserAdditionDataForm = () => {
	return (
		<div className='h-screen'>
			<div className='  relative flex  justify-center h-screen items-center bg-gray-700'>
				<form className='space-x-3'>
					<input
						placeholder='type your Number'
						type='number'
						className='mt-6 sm:py-2 sm:w-96 py-1.5 w-72 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
					/>
					<input
						type='date'
						className='mt-6 sm:py-2 sm:w-96 py-1.5 w-72 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
					/>
					<input
						placeholder='type something'
						type='text'
						className='mt-6 sm:py-2 sm:w-96 py-1.5 w-72 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
					/>
				</form>
			</div>
		</div>
	);
};

export default UserAdditionDataForm;
