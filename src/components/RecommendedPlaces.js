import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Bounce from 'react-reveal/Bounce';

const RecommendedPlaces = () => {
	return (
		<Bounce right>
			<div className='  relative flex justify-center mt-20 items-center mb-20'>
				<div className='text-white pl-6 sm:pl-16 flex  justify-around items-center h-96  bg-recommendations_card  bg-cover bg-center  max-w-7xl gap-36 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out'>
					<div className='max-w-4xl flex flex-col items-center sm:justify-center sm:items-start  '>
						<h1 className='text-xl sm:text-3xl font-bold text-center sm:text-left mr-5 contrast-200'>
							Wavy Team Recommendations
						</h1>
						<p className='text-base text-center sm:text-left sm:text-xl mt-9 mr-5'>
							Wavy Team Recommendations based on the places that tourists often
							visit in Jordan
						</p>
						{/* share form  */}
						<Link to='/recommendations'>
							<button className=' bg-pink-600 font-bold text-white border-none py-1 px-6 sm:px-10 sm:py-2 transition-all duration-300 ease-in-out rounded-full shadow-md hover:shadow-xl hover:bg-opacity-95 transform hover:scale-110 mr-10 mt-14 '>
								Recommendations
							</button>
						</Link>
					</div>
				</div>
			</div>
		</Bounce>
	);
};

export default RecommendedPlaces;
