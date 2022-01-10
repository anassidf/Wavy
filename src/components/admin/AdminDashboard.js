import React from 'react';
import wavyTeam from '../../assets/navbarIcon.svg';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Posts from './Posts';
import TourGuides_admin from './TourGuides_admin';
import Recommendations_admin from './Recommendations_admin';
import Reports from './Reports';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { toast, Toaster } from 'react-hot-toast';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const AdminDashboard = () => {
	const blockUser = () => {
		Confirm.prompt(
			'User Blocker',
			'',
			'',
			'Block',
			'Cancel',
			async (userID) => {
				if (userID) {
					await updateDoc(doc(db, 'Users', userID), {
						blocked: true,
					})
						.then(() => {
							toast.success('User Blocked Successfully');
						})
						.catch(() => {
							toast.error('Invalid User ID');
						});
				} else {
					toast.error('you Did Not Enter User ID');
				}
			},
			() => {},
			{}
		);
	};
	return (
		<div className='min-h-screen '>
			<div className='flex'>
				{/* aside panel */}
				<aside className='lg:w-80 w-16 min-h-screen bg-blue-900 flex  justify-center text-white shadow-md transition-all duration-300 ease-in-out   '>
					{/* <div className='flex items-center mt-20 gap-x-2 font-bold text-white justify-center'>
						<img src={wavyTeam} alt='wavy team logo' className='w-10' />
						<h1>Wavy Team</h1>
					</div> */}

					{/* navigation tabs */}
					<div className='  mt-52 text-lg w-full '>
						<Link
							to='/admin/dashboard/posts'
							className='py-5 w-full flex justify-center gap-x-5 items-center hover:bg-black focus:bg-black hover:bg-opacity-30 focus:bg-opacity-30 transition-all duration-300 ease-in-out hover:text-gray-400 rounded-md'>
							<h1 className='hidden lg:inline-flex flex-1 ml-5'>Posts</h1>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 lg:mr-5'
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
								<path
									fill-rule='evenodd'
									d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
									clip-rule='evenodd'
								/>
							</svg>
						</Link>

						<Link
							to='/admin/dashboard/tour_guides'
							className='py-5 w-full flex justify-center gap-x-5 items-center  hover:bg-black focus:bg-black hover:bg-opacity-30 focus:bg-opacity-30 transition-all duration-300 ease-in-out hover:text-gray-400 rounded-md'>
							<h1 className='hidden lg:inline-flex flex-1 ml-5'>Tour Guides</h1>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 lg:mr-5'
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' />
							</svg>
						</Link>
						<Link
							to='/admin/dashboard/reports'
							className='py-5 w-full flex justify-center gap-x-5 items-center hover:bg-black focus:bg-black hover:bg-opacity-30 focus:bg-opacity-30 transition-all duration-300 ease-in-out hover:text-gray-400 rounded-md'>
							<h1 className='hidden lg:inline-flex flex-1 ml-5'>Reports</h1>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 lg:mr-5'
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path d='M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z' />
							</svg>
						</Link>
						<div
							onClick={blockUser}
							className=' cursor-pointer py-5 w-full flex justify-center gap-x-5 items-center hover:bg-black focus:bg-black hover:bg-opacity-30 focus:bg-opacity-30 transition-all duration-300 ease-in-out hover:text-gray-400 rounded-md'>
							<h1 className='hidden lg:inline-flex flex-1 ml-5'>
								User Blocker
							</h1>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 lg:mr-5'
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z'
									clipRule='evenodd'
								/>
							</svg>
						</div>
						<Link
							to='/admin/dashboard/recommendations'
							className='py-5 w-full flex justify-center gap-x-5 items-center hover:bg-black focus:bg-black hover:bg-opacity-30 focus:bg-opacity-30 transition-all duration-300 ease-in-out hover:text-gray-400 rounded-md'>
							<h1 className='hidden lg:inline-flex flex-1 ml-5'>
								Recommendations
							</h1>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 lg:mr-5'
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path
									fill-rule='evenodd'
									d='M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z'
									clip-rule='evenodd'
								/>
							</svg>
						</Link>
					</div>
				</aside>

				<Switch>
					<Route path='/admin/dashboard/posts' component={Posts} />
					<Route
						path='/admin/dashboard/tour_guides'
						component={TourGuides_admin}
					/>
					<Route
						exact
						path='/admin/dashboard/recommendations'
						component={Recommendations_admin}
					/>
					<Route path='/admin/dashboard/reports' component={Reports} />
				</Switch>
			</div>
			<Toaster position='top-center' />
		</div>
	);
};

export default AdminDashboard;
