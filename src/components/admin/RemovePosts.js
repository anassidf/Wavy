import { useEffect, useState } from 'react';
import { db, auth } from '../../firebaseConfig';
import {
	doc,
	collection,
	getDocs,
	where,
	query,
	deleteDoc,
} from 'firebase/firestore';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { toast, Toaster } from 'react-hot-toast';
const RemovePosts = () => {
	const [data, setData] = useState([]);
	const [ids, setIds] = useState([]);
	useEffect(async () => {
		/*  getting posts data */
		const docsRef = query(collection(db, 'Posts'));
		const posts = await getDocs(docsRef);
		let temp = new Array();
		let ids = new Array();
		posts.forEach((post) => {
			temp.push(post.data());
			ids.push(post.id);
		});

		setData(temp);
		setIds(ids);
		console.log(temp);
	}, []);

	/* delete post methode */
	const deletePost = async (index) => {
		console.log(index);

		let postID = ids[index];
		console.log(postID);

		/* delete post proccess */
		Confirm.show(
			'Delete Post',
			'Are you sure?',
			'Yes',
			'No',
			async () => {
				await deleteDoc(doc(db, 'Posts', postID));
				toast.success('Post deleted successfully');
			},
			() => {},
			{}
		);
	};

	return (
		<div className='min-h-screen flex flex-wrap justify-center'>
			{data?.map((post, index) => (
				<div className='lg:w-super_larg text-center lg:text-left lg:min-h-72 h-super_larg_height w-72 bg-yellow-600 mt-24 mr-5 ml-5 rounded-md  flex flex-col lg:flex lg:flex-row  relative shadow-xl'>
					<div className='lg:w-80 w-full flex justify-center lg:block'>
						<img
							className='h-52 lg:rounded-tl-md lg:rounded-bl-md rounded-tr-md rounded-tl-md lg:rounded-tr-none'
							src={post.imageUrl}
							alt=''
						/>
					</div>

					<div className='mt-16 lg:ml-5 lg:w-text_width text-white flex justify-center flex-col'>
						<p className='font-bold text-lg mb-5'>{post.title}</p>
						<p className='text-xs mb-1'>Created: {post.createdAt}</p>

						<p className='lg:mr-5 lg:ml-0 text-xs ml-5 mr-5 w-10'>
							{post.description}
						</p>

						<div className='lg:flex lg:flex-row mt-7 items-center  lg:justify-between  flex flex-col lg:ml-0 lg:mr-0 ml-1 mr-1 '>
							<button
								onClick={() => {
									deletePost(index);
								}}
								className='text-xs bg-red-600  rounded-sm px-7 py-0.5 h-5 lg:mr-5 mb-5'>
								Delete
							</button>
						</div>
					</div>
				</div>
			))}
			<Toaster position='top-center' />
		</div>
	);
};

export default RemovePosts;
