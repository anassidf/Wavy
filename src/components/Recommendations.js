import React, { useState, useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import petra from '../assets/signUp.jpg';
import ReactPlayer from 'react-player';
import { db } from '../firebaseConfig';
import { getDocs, query, collection } from 'firebase/firestore';
function Recommendations() {
	const [recommendations, setRecommendations] = useState([]);

	useEffect(async () => {
		/* get all recommendations */

		const recommendationRef = collection(db, 'Recommendations');
		const recommendationQuery = query(recommendationRef);
		const data = await getDocs(recommendationQuery);
		let dataTemp = new Array();

		data.forEach((item) => {
			dataTemp.push(item.data());
		});
		setRecommendations(dataTemp);
	}, []);
	return (
		<ReactFullpage
			//fullpage options
			navigation
			scrollHorizontallyKey={'YOUR KEY HERE'}
			licenseKey={'YOUR_KEY_HERE'}
			scrollingSpeed={1000} /* Options here */
			render={({ state, fullpageApi }) => {
				return (
					<ReactFullpage.Wrapper>
						<div className='section relative'>
							<img
								src={petra}
								alt=''
								className='w-full h-full filter blur-sm'
							/>
							<div className='bg-black bg-opacity-60 lg:h-72 h-full absolute lg:bottom-52 lg:top-auto  top-0 left-0 right-0   w-full flex   xl:justify-between justify-center items-center'>
								{/* title */}
								{/* description */}

								<div className='text-white ml-10 space-y-4 lg:text-left text-center'>
									<h1 className=' text-2xl font-bold'>Petra</h1>
									<p className=' lg:w-registeration w-full '>
										Petra is a famous archaeological site in Jordan's
										southwestern desert. Dating to around 300 B.C., it was the
										capital of the Nabatean Kingdom. Accessed via a narrow
										canyon called Al Siq, it contains tombs and temples carved
										into pink sandstone cliffs, earning its nickname, the "Rose
										City." Perhaps its most famous structure is 45m-high Al
										Khazneh, a temple with an ornate, Greek-style facade, and
										known as The Treasury
									</p>
								</div>

								{/* video */}
								<div className='text-white mr-10  lg:inline hidden'>
									<ReactPlayer
										url='https://www.youtube.com/watch?v=ezDiSkOU0wc'
										width='355px'
										height='200px'
										controls={true}
									/>
								</div>
							</div>
						</div>
						<div className='section'>
							<p>Section 2</p>
						</div>
					</ReactFullpage.Wrapper>
				);
			}}
		/>
	);
}

export default Recommendations;
