import React from 'react';
import notFound from '../assets/notFound404.svg';
const NotFound = () => {
	return (
		<div className='min-h-screen flex flex-col justify-center items-center'>
			<img src={notFound} alt='' className='w-96 h-96' />
			<h1 className='font-bold text-xl'>Page Not Found</h1>
		</div>
	);
};

export default NotFound;
