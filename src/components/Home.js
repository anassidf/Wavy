import React from 'react';
import { Link } from 'react-router-dom';

import herosectionSVG from '../assets/herosectionSVG.svg';

import Share from './Share';
const Home = () => {
	return (
		<div className=''>
			<div className='h-screen  flex  w-full items-center justify-between bg-gray-300 '>
				<div className='m-16 space-y-9 flex flex-col items-center sm:block '>
					<h1 className='font-bold text-center text-xl sm:text-4xl sm:text-left sm:w-super_larg'>
						If you dont know where to go in Jordan Wavy got you
					</h1>
					<p className='text-lg text-center sm:text-left sm:text-xl'>
						offers the best jordanian tour guides
					</p>
					<Link to='explore'>
						<button className='font-bold bg-pink-600 hover:bg-opacity-95 sm:py-2 sm:px-11 py-1 px-8 rounded-full shadow-md text-gray-300 mt-10 transform hover:scale-110 hover:shadow-xl transition-all duration-300 ease-in-out'>
							Explore
						</button>
					</Link>
				</div>
				<img
					src={herosectionSVG}
					alt='svg image'
					className='hidden lg:inline h-96 w-96 mr-32 '
				/>
			</div>

			<Share />
		</div>
	);
};

export default Home;
