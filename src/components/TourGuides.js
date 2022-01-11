import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { db, auth } from '../firebaseConfig';
import {
	doc,
	collection,
	getDocs,
	where,
	query,
	deleteDoc,
	getDoc,
	addDoc,
} from 'firebase/firestore';
import noData from '../assets/noData.svg';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { useSelector } from 'react-redux';
import Bounce from 'react-reveal/Bounce';
const TourGuides = () => {
	const [data, setData] = useState([]);
	const [ids, setIds] = useState([]);
	const [city, setCity] = useState('');

	const showState = useSelector((state) => {
		return state.showUser.showUser;
	});
	const history = useHistory();
	const params = useParams();

	useEffect(async () => {
		if (params.place === 'all') {
			setCity('');
		} else {
			setCity(params.place);
		}

		/*  getting posts data */
		const docsRef = query(
			collection(db, 'Users'),
			where('isTourGuide', '==', true),
			where('isTourGuideAccepted', '==', 'approaved')
		);
		const posts = await getDocs(docsRef);
		let temp = new Array();
		let ids = new Array();
		posts.forEach((post) => {
			temp.push(post.data());
			ids.push(post.id);
		});

		setData(temp);
		setIds(ids);
	}, []);

	const filterTourGuide = (tourGuides) => {
		return tourGuides?.filter((tourGuide) => {
			return tourGuide?.cityToGuideIn
				?.toLowerCase()
				?.includes(city?.toLowerCase());
		});
	};

	const reserve = async (index) => {
		let reservedTourGuide = ids[index];

		const getter = await getDoc(doc(db, 'Users', reservedTourGuide));
		const tourGuide = getter.data();
		if (auth.currentUser && showState) {
			/* dialog box has contact info */
			Report.info(
				`${tourGuide.name} Contact Info`,

				`${tourGuide.phoneNumber} - ${tourGuide.businessEmail}`,
				'Done',
				{
					className: 'text-center breack-words',
				}
			);
		} else {
			Report.failure(
				'Not Allowed Action',
				'You must be logged in to Reveal Tour Guide Information',
				'Login',
				() => {
					history.push('/login');
				},
				{ className: 'text-center' }
			);
		}
	};

	const report = (index) => {
		let reportOnId = ids[index];

		if (auth.currentUser && showState) {
			Confirm.prompt(
				'Report',
				'Type Your Report',
				'',
				'Send',
				'Cancel',
				(clientReport) => {
					addDoc(collection(db, 'Reports'), {
						reporterId: auth.currentUser.uid,
						reportOnId,
						report: clientReport,
					});
					toast.success('Report Sent Successfully');
				},
				() => {},
				{}
			);
		} else {
			Report.failure(
				'Not Allowed Action',
				'You must be logged in to report a tour guide',
				'Login',
				() => {
					history.push('/login');
				},
				{ className: 'text-center' }
			);
		}
	};
	return (
		<div className='min-h-screen flex justify-center flex-wrap '>
			<div className='h-96  bg-find_tour_guide bg-cover bg-no-repeat bg-center w-full  flex flex-col  items-center relative'>
				<div className='bg-black bg-opacity-50 absolute top-0 left-0 right-0 h-full w-full'></div>

				{/* text */}
				{/* <p>
					Search for the desierd City and you will find a lot of amazing Tour
					Guides There
				</p> */}

				{/* search bar */}
				<div className='bg-white shadow-md  w-super_larg lg:w-tour_guide_card flex rounded-full items-center justify-between absolute bottom-10 '>
					<input
						value={city}
						type='text'
						className='sm:w-80 w-32 py-2 sm:px-2 px-1 rounded-full sm:ml-10 ml-5 outline-none sm:text-lg text-sm  '
						placeholder='Enter The City Name'
						onChange={(e) => {
							setCity(e.target.value);
						}}
					/>
					<div className=' flex items-center'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-7 w-7 mr-3 text-gray-500'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path d='M9 9a2 2 0 114 0 2 2 0 01-4 0z' />
							<path
								fill-rule='evenodd'
								d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z'
								clip-rule='evenodd'
							/>
						</svg>
						<div className='hidden  w-32 h-8   bg-green-400 rounded-full sm:flex justify-center items-center shadow-md mr-3'>
							<h1 className='font-bold text-white'>Enjoy</h1>
						</div>
					</div>
				</div>
			</div>

			{/* card container */}
			{data?.length ? (
				filterTourGuide(data)?.map(
					(tourGuide, index) => (
						console.log(tourGuide),
						(
							<Bounce bottom>
								<div className='lg:w-super_larg text-center lg:text-left lg:min-h-72 h-super_larg_height w-60 bg-blue-500 mt-10 mr-5 ml-5 rounded-md  flex flex-col lg:flex lg:flex-row  relative shadow-xl'>
									<Link
										to={
											auth.currentUser && showState
												? `/profile-page/${tourGuide.uid}`
												: '/login'
										}>
										<div className='lg:w-80 w-full lg:h-72 h-52 '>
											<img
												className=' h-full  lg:w-62 w-full lg:rounded-tl-md lg:rounded-bl-md rounded-tr-md rounded-tl-md lg:rounded-tr-none'
												src={tourGuide?.photo}
												alt=''
											/>
										</div>
									</Link>

									<div className='mt-16 lg:ml-5 lg:w-tour_guide_cards_text1 w-tour_guide_cards_text2 text-white flex justify-center flex-col break-words'>
										<p className='font-bold text-lg mb-5'>{tourGuide?.name}</p>
										<p className='text-xs mb-1'>
											Born: {tourGuide?.dateOfBirth}
										</p>
										<p className='text-xs mb-3'>
											{' '}
											Address: {tourGuide?.address}
										</p>
										<p className='lg:mr-5 lg:ml-0 text-xs ml-5 mr-5 '>
											{tourGuide?.description}
										</p>

										{/* small squars */}
										<div className='lg:flex lg:flex-row mt-7 items-center  lg:justify-between  flex flex-col lg:ml-0 lg:mr-0 ml-1 mr-1 '>
											<div className='flex mb-3 items-center flex-wrap justify-center gap-1'>
												<section className='flex  items-center space-x-1 text-xs  px-7 py-0.5 bg-black bg-opacity-60 rounded-sm'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														className='h-4 w-4 animate-pulse'
														fill='none'
														viewBox='0 0 24 24'
														stroke='currentColor'>
														<path
															stroke-linecap='round'
															stroke-linejoin='round'
															stroke-width='2'
															d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
														/>
													</svg>
													<span>{tourGuide?.cityToGuideIn}</span>
												</section>
												<section className='flex  items-center space-x-1 text-xs  px-7 py-0.5 bg-black bg-opacity-60 rounded-sm'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														className='h-4 w-4 animate-spin'
														viewBox='0 0 20 20'
														fill='currentColor'>
														<path
															fillRule='evenodd'
															d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
															clipRule='evenodd'
														/>
													</svg>
													<span>{tourGuide?.status}</span>
												</section>
											</div>
											<div className='flex flex-col lg:flex lg:flex-row'>
												<button
													onClick={() => {
														report(index);
													}}
													className='text-xs bg-red-600  rounded-sm px-7 py-0.5 h-5 lg:mr-5 mb-1 shadow-md transform hover:scale-110 transition-all duration-300'>
													Report
												</button>
												<button
													onClick={() => {
														reserve(index);
													}}
													className='text-xs bg-purple-800  rounded-sm px-7 py-0.5 h-5 lg:mr-5 mb-5 shadow-md transform hover:scale-110 transition-all duration-300'>
													Contact
												</button>
											</div>
										</div>
									</div>
								</div>
							</Bounce>
						)
					)
				)
			) : (
				<div className='h-full flex flex-col items-center'>
					<img src={noData} alt='' className='h-52 w-52 ' />
					<p>There is No Tour Guides Available</p>
				</div>
			)}
			{filterTourGuide(data).length === 0 && data?.length !== 0 ? (
				<div className='h-full flex flex-col items-center'>
					<img src={noData} alt='' className='h-52 w-52 ' />
					<p>There is No Tour Guides in {city}</p>
				</div>
			) : (
				''
			)}
			<Toaster position='top-center' />
		</div>
	);
};

export default TourGuides;
