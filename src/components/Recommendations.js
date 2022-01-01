import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image from '../assets/login.jpg';
import { FaArrowAltCircleDown } from 'react-icons/fa';
const Recommendations = () => {
	const SampleNextArrow = (props) => {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{
					...style,
					display: 'block',

					position: 'absolute',
					right: '10px',
				}}
				onClick={onClick}>
				<FaArrowAltCircleDown />
			</div>
		);
	};

	const SamplePrevArrow = (props) => {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{
					...style,
					display: 'block',

					zIndex: '1',
					position: 'absolute',
					left: '10px',
				}}
				onClick={onClick}
			/>
		);
	};

	const settings = {
		dots: true,
		Infinite: true,
		lazyLoad: true,
		speed: 300,
		slidesToShow: 1,

		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	return (
		<div className='min-h-screen  '>
			<Slider
				{...settings}
				className='  w-full h-carousel_height bg-center relative'>
				<div className='h-screen w-full'>
					<img className='h-screen w-carousel_image ' src={image} alt='' />
				</div>
				<div className='h-screen w-full'>
					<img className='h-screen w-carousel_image fixed' src={image} alt='' />
				</div>
			</Slider>
		</div>
	);
};

export default Recommendations;
