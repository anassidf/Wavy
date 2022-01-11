import { useEffect, useState } from 'react';
import { db, auth } from '../../firebaseConfig';
import {
	doc,
	collection,
	getDocs,
	where,
	query,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { toast, Toaster } from 'react-hot-toast';
import noData from '../../assets/noData.svg';
import Bounce from 'react-reveal/Bounce';

const RemovePosts = () => {
	const [data, setData] = useState([]);
	const [ids, setIds] = useState([]);
	useEffect(async () => {
		/*  getting posts data */
		const docsRef = query(
			collection(db, 'Posts'),
			where('status', '==', 'approaved'),
			where('trashed', '==', false)
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
		console.log(temp);
	}, []);

	/* move post to trash methode */
	const deletePost = async (index) => {
		console.log(index);

		let postID = ids[index];

		Confirm.show(
			'Move To Trash',
			'Are you sure?',
			'Yes',
			'No',
			async () => {
				await updateDoc(doc(db, 'Posts', postID), {
					trashed: true,
					status: 'under review',
				});
				toast.success('Moved to Trash successfully');
			},
			() => {},
			{}
		);
	};

	return (
		<div className=' flex justify-center items-center flex-wrap '>
			{data.length ? (
				data?.map((post, index) => (
					<Bounce bottom>
						<div
							key={index}
							className='xl:w-super_larg text-center xl:text-left xl:min-h-72  w-40 bg-blue-500  mt-24 mr-5 ml-5 rounded-md  flex flex-col xl:flex xl:flex-row  relative shadow-xl break-words'>
							{/* <div className='xl:w-80 w-full flex justify-center xl:block'> */}
							<img
								className='h-52 w-72 xl:h-72 xl:rounded-tl-md xl:rounded-bl-md rounded-tr-md rounded-tl-md xl:rounded-tr-none '
								src={post.imageUrl}
								alt=''
							/>
							{/* 	</div> */}

							<div className='mt-16 xl:ml-5 xl:w-text_width   flex justify-center flex-col break-words xl:break-words text-white '>
								<div className='h-52 xl:h-32 '>
									<p className='font-bold text-xl mb-5 '>{post.title}</p>
									<p className='text-xs mb-1'>Created in: {post.createdAt}</p>

									<p className='xl:mr-5 xl:ml-0 text-xs ml-5 mr-5  '>
										{post.description}
									</p>
								</div>

								<div className='xl:flex xl:flex-row mt-7 items-center  xl:justify-between  flex flex-col xl:ml-0 xl:mr-0 ml-1 mr-1 '>
									<button
										onClick={() => {
											deletePost(index);
										}}
										className='text-xs bg-red-600  rounded-sm px-7 py-0.5 h-5 xl:mr-5 mb-5 transform hover:scale-110 transition-all duration-300 ease-in-out'>
										Move to Trash
									</button>
								</div>
							</div>
						</div>
					</Bounce>
				))
			) : (
				<div className='flex flex-col justify-center items-center mt-32'>
					<img src={noData} alt='' className='w-52 h-52' />

					<h1 className='sm:text-md text-sm text-center'>
						There is No Posts to Remove
					</h1>
				</div>
			)}
			<Toaster position='top-center' />
		</div>
	);
};

export default RemovePosts;
