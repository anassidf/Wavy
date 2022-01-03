import React from 'react';
import wavyTeam from '../../assets/navbarIcon.svg';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Posts from './Posts';
import TourGuides_admin from './TourGuides_admin';
import Recommendations_admin from './Recommendations_admin';
const AdminDashboard = () => {
	return (
		<div className='min-h-screen '>
			<div className='flex'>
				{/* aside panel */}
				<aside className='w-80 min-h-screen bg-blue-900 flex   justify-center text-white'>
					{/* <div className='flex items-center mt-20 gap-x-2 font-bold text-white justify-center'>
						<img src={wavyTeam} alt='wavy team logo' className='w-10' />
						<h1>Wavy Team</h1>
					</div> */}

					{/* navigation tabs */}
					<div className='flex flex-col gap-y-10 mt-52'>
						<Link to='/admin/dashboard/posts'>
							<h1 className=' hover:text-gray-400 transition-all duration-300 ease-in-out'>
								Posts
							</h1>
						</Link>
						<Link to='/admin/dashboard/tour_guides'>
							<h1 className='hover:text-gray-400 transition-all duration-300 ease-in-out'>
								Tour Guides
							</h1>
						</Link>
						<Link to='/admin/dashboard/recommendations'>
							<h1 className='hover:text-gray-400 transition-all duration-300 ease-in-out'>
								Recommendations
							</h1>
						</Link>
					</div>
				</aside>

				<Switch>
					<Route path='/admin/dashboard/posts' component={Posts} />
					<Route
						exact
						path='/admin/dashboard/tour_guides'
						component={TourGuides_admin}
					/>
					<Route
						exact
						path='/admin/dashboard/recommendations'
						component={Recommendations_admin}
					/>
				</Switch>
			</div>
		</div>
	);
};

export default AdminDashboard;
