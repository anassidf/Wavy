import React, { useState, useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import petra from '../assets/signUp.jpg';
import ReactPlayer from 'react-player';
import { db } from '../firebaseConfig';
import { getDocs, query, collection } from 'firebase/firestore';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/fall-animation.css';
import 'react-awesome-slider/dist/styles.css';
import Fade from 'react-reveal/Fade';
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
		console.log(dataTemp);
	}, []);
	return (
		<AwesomeSlider
			animation='fallAnimation'
			bullets={false}
			style={{ height: '100vh' }}>
			{recommendations.map((item, index) => (
				<div
					className='h-screen w-screen'
					style={{ height: '100vh' }}
					key={index}>
					<img
						src={item.imageUrl}
						alt=''
						className='w-screen h-screen filter blur-sm'
					/>
					<div className='bg-black bg-opacity-60 lg:h-72 h-full absolute lg:bottom-52 lg:top-auto  top-0 left-0 right-0   w-full flex lg:flex-row flex-col lg:justify-between  items-center justify-center'>
						{/* title */}
						{/* description */}
						<Fade bottom>
							<div className='text-white lg:ml-32  space-y-4 lg:text-left text-center'>
								<h1 className=' text-2xl font-bold'>{item.title}</h1>
								<p className=' lg:w-registeration w-full '>
									{item.description}
								</p>
							</div>

							{/* video */}
							<div className='text-white lg:mr-32 lg:mt-0 mr-0 mt-20 '>
								<ReactPlayer
									url={item.youtubeLink}
									width='265px'
									height='150px'
									controls={true}
								/>
							</div>
						</Fade>
					</div>
				</div>
			))}
		</AwesomeSlider>
	);
}

export default Recommendations;
