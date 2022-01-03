import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import RemoveTourGuides from './RemoveTourGuides';
import TourGuideRequests from './TourGuideRequests';

const TourGuides_admin = () => {
	return (
		<div className='min-h-screen  flex-1 bg-gray-200'>
			{/* waiting and remove posts */}
			<div className='bg-gray-200 '>
				<div className='flex  gap-x-10 pt-32   justify-around border-b-2 border-gray-300'>
					<Link to='/admin/dashboard/tour_guides/requests'>
						<h1 className='hover:text-gray-400 transition-all duration-300 ease-in-out text-xs lg:text-lg'>
							Waiting Requests
						</h1>
					</Link>

					<Link to='/admin/dashboard/tour_guides/remove'>
						<h1 className='hover:text-gray-400 transition-all duration-300 ease-in-out text-xs lg:text-lg'>
							Remove Tour Guide
						</h1>
					</Link>
				</div>

				{/* content */}

				{
					<div>
						<Route
							exact
							path='/admin/dashboard/tour_guides/requests'
							component={TourGuideRequests}
						/>
						<Route
							exact
							path='/admin/dashboard/tour_guides/remove'
							component={RemoveTourGuides}
						/>
					</div>
				}
			</div>
		</div>
	);
};

export default TourGuides_admin;
