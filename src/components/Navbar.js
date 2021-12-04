import blackNavbarIcon from '../assets/blackNavbarIcon.svg';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import menuIcon from '../assets/menuIcon.svg';
import exitNavbarIcon from '../assets/exitNavbarIcon.svg';
import { authentication } from '../firebaseConfig';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
	const [scrolling, setScrolling] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);
	const [username, setUsername] = useState('anas');
	const [userImage, setUserImage] = useState('');
	const history = useHistory();

	const scrollHandler = () => {
		window.scrollY > 100 ? setScrolling(true) : setScrolling(false);
	};

	useEffect(() => {
		window.addEventListener('scroll', scrollHandler);

		/* will check whether the user logged in or not  */

		authentication.onAuthStateChanged((user) => {
			if (user) {
				setAuthenticated(true);
				setUsername(user.displayName);
				setUserImage(user.photoURL);
			} else {
				setAuthenticated(false);
				setUsername('');
				setUserImage('');
			}
		});
	}, []);

	const dropMenu = () => {
		document.getElementById('mobileNav').style.top = '0';
	};
	const exitMenu = () => {
		document.getElementById('mobileNav').style.top = '-100%';
	};

	const logOut = () => {
		authentication.signOut();
		history.push('/');
	};
	return (
		<nav className='fixed right-0 left-0 top-0 z-10'>
			{/* desktop navbar */}
			<div
				className={`${
					scrolling ? 'bg-gray-300 shadow-md' : ''
				} text-black bg-transparent relative h-14  flex items-center text-lg transition-all duration-300 ease-in-out`}>
				<div className='flex  items-center  ml-6 sm:ml-16'>
					<Link to='/'>
						<div className='flex items-center space-x-1 cursor-pointer'>
							<img
								src={blackNavbarIcon}
								alt='wavy logo'
								className=' sm:h-10 h-6'
							/>
							<h1
								className='font-bold'
								className='text-sm sm:text-lg font-bold'>
								Wavy
							</h1>
						</div>
					</Link>
					{/* navbar links */}
					<div className='space-x-7 flex items-center  absolute right-6 sm:right-16  '>
						<Link
							to='/'
							className='hover:opacity-80 trasition-all duration-200 hidden sm:inline-flex'>
							Home
						</Link>
						<Link
							to='/explore'
							className='hover:opacity-80 trasition-all duration-200 hidden sm:inline-flex'>
							Explore
						</Link>

						{authenticated ? (
							<>
								<Link
									to='/'
									className='sm:flex items-center justify-center space-x-1 hidden'>
									<Avatar src={userImage} />
									<p>{username}</p>
								</Link>
								<button
									onClick={logOut}
									className='py-1 px-6 rounded-full bg-pink-600 shadow-sm hover:bg-opacity-70 transition-all duration-300 text-white hidden sm:inline-flex'>
									Log Out
								</button>
							</>
						) : (
							<>
								<Link
									to='/login'
									className='hover:opacity-80 trasition-all duration-200 hidden sm:inline-flex'>
									Log in
								</Link>
								<Link
									to='/registration'
									className='py-1 px-6 rounded-full bg-pink-600 shadow-sm hover:bg-opacity-70 transition-all duration-300 text-white hidden sm:inline-flex'>
									Join Us
								</Link>
							</>
						)}

						<img
							id='menuIcon'
							src={menuIcon}
							alt='menu icon'
							className='h-6 cursor-pointer sm:hidden '
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
						<Link
							onClick={exitMenu}
							to='/explore'
							className='hover:opacity-80 trasition-all duration-200'>
							Explore
						</Link>
						{authenticated ? (
							<>
								{' '}
								<Link
									onClick={exitMenu}
									to='/'
									className='flex items-center justify-center space-x-1'>
									<Avatar src={userImage} />
									<p>{username}</p>
								</Link>
								<button
									onClick={logOut}
									className='py-.5 px-6 rounded-full bg-pink-600 shadow-sm hover:bg-opacity-70 transition-all duration-300 text-white text-sm font-bold '>
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
									className='py-.5 px-6 rounded-full bg-pink-600 shadow-sm hover:bg-opacity-70 transition-all duration-300 text-white text-sm font-bold '>
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
