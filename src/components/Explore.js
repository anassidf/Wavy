import Post from './Post.js';
import { useEffect, useState } from 'react';
import data from './data.js';
import Navbar from './Navbar';
import exploreSVG from '../assets/exploreSVG.svg';
const Explore = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		setPosts(data);
	}, []);
	return (
		<div>
			<div className='relative bg-gray-300  h-96 flex items-end justify-center'>
				<input
					type='text'
					name=''
					id=''
					className='rounded-full border-none outline-none px-28 py-2 mb-28 tracking-widest '
					placeholder='Where to Go?'
				/>
				<img src={exploreSVG} alt='' className='absolute right-0 h-64' />
			</div>

			<div>
				{posts.map((post, index) => (
					<Post post={post} key={index} />
				))}
			</div>
		</div>
	);
};

export default Explore;
