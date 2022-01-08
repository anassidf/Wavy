import Post from './Post';
import { useEffect, useState } from 'react';
import data from './data';
import emptyData from '../assets/emptyData.svg';
import { auth, db } from '../firebaseConfig';
import {
	collection,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	doc,
	deleteDoc,
} from 'firebase/firestore';
const Explore = () => {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState('');
	const [isPostsLoading, setIsPostsLoading] = useState(true);
	const postsCollectionRef = collection(db, 'Posts');
	const fetchPosts = async () => {
		setIsPostsLoading(true);
		const data = await getDocs(postsCollectionRef);
		setPosts(
			data.docs.map((doc) => {
				return doc.data();
			})
		);
		setIsPostsLoading(false);
	};
	const doSearch = (cards) => {
		return cards.filter((card) => {
			if (search === '') return card;
			else return card.title.toLowerCase().includes(search.toLowerCase());
		});
	};
	useEffect(() => {
		fetchPosts();
	}, []);
	return (
		<div className=''>
			<div className='relative bg-gray-300  h-40 flex items-end justify-center'>
				<input
					type='text'
					value={search}
					className='rounded-t-2xl rounded-b-2xl border-none outline-none pl-5 py-2 mb-8 tracking-widest w-60 sm:w-80 mx-12'
					placeholder='Where to Go?'
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			<div className='flex flex-wrap justify-center'>
				{isPostsLoading && (
					<div className='w-full h-screen flex justify-center items-center'>
						<h1 className='text-2xl'>Loading...</h1>
					</div>
				)}
				{doSearch(posts).length !== 0 ? (
					doSearch(posts).map((post, index) => <Post post={post} key={index} />)
				) : (
					<div className='flex items-center justify-center flex-col sm:flex-row mt-24 mb-24 mx-2'>
						<img src={emptyData} alt='Empty Data!' className='w-72 h-72' />
						<p className='text-gray-400 text-3xl'>No Data Found!</p>
					</div>
				)}
			</div>
			{/* TODO:: recomended places */}
			{/* <div className="flex flex-wrap justify-center">
        {posts.length !== 0 ? (
          posts.map((post, index) => <Post post={post} key={index} />)
        ) : (
          <img src={emptyData} alt="" />
        )}
      </div> */}
		</div>
	);
};

export default Explore;
