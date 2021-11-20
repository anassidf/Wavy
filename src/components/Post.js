import image from '../assets/homeImage.jpg';
import { useEffect, useState } from 'react';
const Post = ({ post }) => {
	const { placeName, placeImage, placeInfo } = post;
	useEffect(() => {
		console.log(post);
	}, []);
	return (
		<div className='post-details'>
			<h2>{placeName}</h2>
			<img src={placeImage} alt={placeName} />
			<p>{placeInfo}</p>
		</div>
	);
};

export default Post;
