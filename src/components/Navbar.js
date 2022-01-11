import blackNavbarIcon from '../assets/blackNavbarIcon.svg';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import menuIcon from '../assets/menuIcon.svg';
import exitNavbarIcon from '../assets/exitNavbarIcon.svg';
import { auth } from '../firebaseConfig';
import { useHistory } from 'react-router-dom';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { Menu, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';

const Navbar = () => {
	const [scrolling, setScrolling] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);

	const [userImage, setUserImage] = useState('');
	const showState = useSelector((state) => {
		return state.showUser.showUser;
	});
	const history = useHistory();

	const scrollHandler = () => {
		window.scrollY > 100 ? setScrolling(true) : setScrolling(false);
	};

	useEffect(() => {
		window.addEventListener('scroll', scrollHandler);

		/* will check whether the user logged in or not  */

		auth.onAuthStateChanged((user) => {
			if (user) {
				setAuthenticated(true);

				setUserImage(user.photoURL);
			} else {
				setAuthenticated(false);

				setUserImage('');
			}
		});
		return () => {};
	}, []);

	useEffect(() => {
		if (
			window.location.href == 'http://localhost:3000/admin' ||
			window.location.href == 'http://localhost:3000/admin/dashboard' ||
			window.location.href == 'http://localhost:3000/admin/dashboard/posts' ||
			window.location.href ==
				'http://localhost:3000/admin/dashboard/posts/remove' ||
			window.location.href ==
				'http://localhost:3000/admin/dashboard/posts/waiting' ||
			window.location.href ==
				'http://localhost:3000/admin/dashboard/tour_guides/requests' ||
			window.location.href ==
				'http://localhost:3000/admin/dashboard/tour_guides/remove' ||
			window.location.href ==
				'http://localhost:3000/admin/dashboard/recommendations' ||
			window.location.href ==
				'http://localhost:3000/admin/dashboard/tour_guides' ||
			window.location.href == 'http://localhost:3000/admin/dashboard/reports' ||
			window.location.href ==
				'http://localhost:3000/admin/dashboard/posts/trash' ||
			window.location.href ==
				'http://localhost:3000/admin/dashboard/tour_guides/trash' ||
			window.location.href ==
				'http://localhost:3000/admin/dashboard/reports/show_reports' ||
			window.location.href ==
				'http://localhost:3000/admin/dashboard/reports/trash'
		) {
			document.getElementById('navbar').style.backgroundColor = '#34D399';
		} else return;
	}, [window.location.href]);

	const contactUs = () => {
		Report.info(
			`Contact Wavy Info`,

			'0799132736 - ' + 'Tourism@wavy.com',
			'Done',
			{
				className: 'text-center breack-words',
			}
		);
	};

	const dropMenu = () => {
		document.getElementById('mobileNav').style.top = '0';
	};
	const exitMenu = () => {
		document.getElementById('mobileNav').style.top = '-100%';
	};

	const logOut = () => {
		auth.signOut();
		history.push('/');
	};
	return (
		<nav className='fixed right-0 left-0 top-0 z-30'>
			{/* desktop navbar */}
			<div
				id='navbar'
				className={`${
					scrolling ? 'bg-green-400 shadow-md' : ''
				} text-black bg-transparent relative h-14  flex items-center text-lg transition-all duration-300 ease-in-out`}>
				<div className='flex  items-center  ml-6 lg:ml-16'>
					<Link to='/'>
						<div className='flex items-center space-x-1 cursor-pointer'>
							<img
								src={blackNavbarIcon}
								alt='wavy logo'
								className=' lg:h-10 h-6'
							/>
							<h1
								className='font-bold'
								className='text-lg lg:text-lg font-bold'>
								Wavy
							</h1>
						</div>
					</Link>
					{/* navbar links */}
					<div className='space-x-7 flex items-center  absolute right-6 lg:right-16  '>
						<Link
							to='/'
							className='hover:opacity-80 trasition-all duration-200 hidden lg:inline-flex'>
							Home
						</Link>
						<Menu as='div' className='relative'>
							<Menu.Button className='hover:opacity-80 trasition-all duration-200 hidden lg:inline-flex  items-center '>
								Shortcuts
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-4 w-4 ml-1'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19 9l-7 7-7-7'
									/>
								</svg>
							</Menu.Button>
							<Transition
								enter='transition ease-out duration-100'
								enterFrom='transform opacity-0 scale-95'
								enterTo='transform opacity-100 scale-100'
								leave='transition ease-in duration-75'
								leaveFrom='transform opacity-100 scale-100'
								leaveTo='transform opacity-0 scale-95'>
								<Menu.Items
									as='data'
									className='absolute left-0 text-gray-800 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none text-sm'>
									<Link
										to={
											authenticated && showState
												? `/profile-page/${auth?.currentUser?.uid}`
												: ''
										}>
										<Menu.Item
											as='div'
											className=' hover:bg-gray-300 hover:bg-opacity-70 flex items-center justify-between py-2 px-4 rounded-md transition-all duration-300 ease-in-out'>
											<h1> Profile</h1>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-5 w-5'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
													clipRule='evenodd'
												/>
											</svg>
										</Menu.Item>
									</Link>
									<Link to='/share'>
										<Menu.Item
											className=' hover:bg-gray-300 text-gray-800  hover:bg-opacity-70 flex items-center justify-between py-2 px-4 rounded-md transition-all duration-300 ease-in-out '
											as='div'>
											<h1>Create Post</h1>

											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-5 w-5'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z'
													clipRule='evenodd'
												/>
											</svg>
										</Menu.Item>
									</Link>
									<Link to='/tour_guides/all'>
										<Menu.Item
											className=' hover:bg-gray-300  text-gray-800 hover:bg-opacity-70 flex items-center justify-between py-2 px-4 rounded-md transition-all duration-300 ease-in-out'
											as='div'>
											<h1>Tour Guides</h1>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-5 w-5'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
													clipRule='evenodd'
												/>
											</svg>
										</Menu.Item>
									</Link>
									<Link to='/recommendations'>
										<Menu.Item
											className=' hover:bg-gray-300  text-gray-800 hover:bg-opacity-70 flex items-center justify-between py-2 px-4 rounded-md transition-all duration-300 ease-in-out'
											as='div'>
											<h1>Recommendations</h1>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-5 w-5'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z'
													clipRule='evenodd'
												/>
												<path d='M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z' />
											</svg>
										</Menu.Item>
									</Link>

									<Menu.Item
										onClick={contactUs}
										className='cursor-pointer hover:bg-gray-300  text-gray-800 hover:bg-opacity-70 flex items-center justify-between py-2 px-4 rounded-md transition-all duration-300 ease-in-out'
										as='div'>
										<h1>Contact Us</h1>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-5 w-5'
											viewBox='0 0 20 20'
											fill='currentColor'>
											<path
												fillRule='evenodd'
												d='M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z'
												clipRule='evenodd'
											/>
										</svg>
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>
						<Link
							to='/explore'
							className='hover:opacity-80 trasition-all duration-200 hidden lg:inline-flex'>
							Explore
						</Link>

						{authenticated && showState ? (
							<>
								<Link
									to={'/profile-page/' + auth.currentUser.uid}
									className='lg:flex items-center justify-center space-x-1 hidden'>
									<Avatar src={userImage} />
								</Link>
								<button
									onClick={logOut}
									className='py-1 px-6 rounded-full bg-pink-600 shadow-lg hover:bg-opacity-70 transition-all duration-300 text-white hidden lg:inline-flex'>
									Log Out
								</button>
							</>
						) : (
							<>
								<Link
									to='/login'
									className='hover:opacity-80 trasition-all duration-200 hidden lg:inline-flex'>
									Log in
								</Link>
								<Link
									to='/registration'
									className='py-1 px-6 rounded-full bg-pink-600 shadow-lg hover:bg-opacity-70 transition-all duration-300 text-white hidden lg:inline-flex'>
									Sign Up
								</Link>
							</>
						)}

						<img
							id='menuIcon'
							src={menuIcon}
							alt='menu icon'
							className='h-6 cursor-pointer lg:hidden '
							onClick={dropMenu}
						/>
					</div>
				</div>
			</div>

			{/* mobile navbar */}

			<div
				id='mobileNav'
				className='h-screen bg-gray-300 fixed -top-full left-0 right-0 transition-all duration-300 ease-in-out'>
				<div className=' relative flex justify-center items-center h-full'>
					{/* navbar links */}
					<img
						src={exitNavbarIcon}
						alt='menu icon'
						className='h-6 absolute top-3 left-3 cursor-pointer'
						onClick={exitMenu}
					/>
					<div className='flex flex-col justify-center items-center text-2xl space-y-4'>
						<Link onClick={exitMenu} to='/' className='absolute top-3'>
							<div className='flex items-center justify-center '>
								<img src={blackNavbarIcon} alt='wavy logo' className='h-9' />
								<h1 className='font-bold' className='text-lg font-bold'>
									Wavy
								</h1>
							</div>
						</Link>
						<Link
							onClick={exitMenu}
							to='/'
							className='hover:opacity-80 trasition-all duration-200'>
							Home
						</Link>
						<Menu as='div' className='relative '>
							<Menu.Button className='hover:opacity-80 trasition-all duration-200  flex  items-center '>
								Shortcuts
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-4 w-4 ml-1'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19 9l-7 7-7-7'
									/>
								</svg>
							</Menu.Button>
							<Transition
								enter='transition ease-out duration-100'
								enterFrom='transform opacity-0 scale-95'
								enterTo='transform opacity-100 scale-100'
								leave='transition ease-in duration-75'
								leaveFrom='transform opacity-100 scale-100'
								leaveTo='transform opacity-0 scale-95'>
								<Menu.Items
									as='data'
									className='absolute  text-gray-800 w-52 mt-2 -left-10 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none text-xs'>
									<Link
										to={
											authenticated
												? `/profile-page/${auth?.currentUser?.uid}`
												: ''
										}>
										<Menu.Item
											onClick={exitMenu}
											as='div'
											className=' hover:bg-gray-300 hover:bg-opacity-70 flex items-center justify-between py-2 px-4 rounded-md transition-all duration-300 ease-in-out'>
											<h1> Profile</h1>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-5 w-5'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
													clipRule='evenodd'
												/>
											</svg>
										</Menu.Item>
									</Link>
									<Link to='/share'>
										<Menu.Item
											onClick={exitMenu}
											className=' hover:bg-gray-300 text-gray-800  hover:bg-opacity-70 flex items-center justify-between py-2 px-4 rounded-md transition-all duration-300 ease-in-out '
											as='div'>
											<h1>Create Post</h1>

											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-5 w-5'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z'
													clipRule='evenodd'
												/>
											</svg>
										</Menu.Item>
									</Link>
									<Link to='/tour_guides/all'>
										<Menu.Item
											onClick={exitMenu}
											className=' hover:bg-gray-300  text-gray-800 hover:bg-opacity-70 flex items-center justify-between py-2 px-4 rounded-md transition-all duration-300 ease-in-out'
											as='div'>
											<h1>Tour Guides</h1>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-5 w-5'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
													clipRule='evenodd'
												/>
											</svg>
										</Menu.Item>
									</Link>
									<Link to='/recommendations'>
										<Menu.Item
											className=' hover:bg-gray-300  text-gray-800 hover:bg-opacity-70 flex items-center justify-between py-2 px-4 rounded-md transition-all duration-300 ease-in-out'
											as='div'>
											<h1>Recommendations</h1>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-5 w-5'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z'
													clipRule='evenodd'
												/>
												<path d='M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z' />
											</svg>
										</Menu.Item>
									</Link>
									<Menu.Item
										onClick={contactUs}
										className='cursor-pointer hover:bg-gray-300  text-gray-800 hover:bg-opacity-70 flex items-center justify-between py-2 px-4 rounded-md transition-all duration-300 ease-in-out'
										as='div'>
										<h1>Contact Us</h1>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-5 w-5'
											viewBox='0 0 20 20'
											fill='currentColor'>
											<path
												fillRule='evenodd'
												d='M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z'
												clipRule='evenodd'
											/>
										</svg>
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>

						<Link
							onClick={exitMenu}
							to='/explore'
							className='hover:opacity-80 trasition-all duration-200'>
							Explore
						</Link>
						{authenticated && showState ? (
							<>
								{' '}
								<Link
									onClick={exitMenu}
									to='/'
									className='flex items-center justify-center space-x-1'>
									<Avatar src={userImage} />
								</Link>
								<button
									onClick={logOut}
									className='py-.5 px-6 rounded-full bg-pink-600 shadow-lg hover:bg-opacity-70 transition-all duration-300 text-white text-lg font-bold '>
									Log Out
								</button>
							</>
						) : (
							<>
								<Link
									onClick={exitMenu}
									to='/login'
									className='hover:opacity-80 trasition-all duration-200'>
									Log in
								</Link>
								<Link
									onClick={exitMenu}
									to='/registration'
									className='py-.5 px-6 rounded-full bg-pink-600 shadow-lg hover:bg-opacity-70 transition-all duration-300 text-white text-lg font-bold '>
									Join Us
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
