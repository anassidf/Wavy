import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { db, authentication, storage } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useEffect } from 'react';
import gellary from '../assets/gallery.png';
import { Toaster, toast } from 'react-hot-toast';

const ShareForm = () => {
	const [image, setImage] = useState(gellary);
	const [progress, setProgress] = useState(0);
	const [fileDetails, setFileDetails] = useState({});
	const imageRef = useRef();

	const handleImageUpload = (e) => {
		setFileDetails(e.target.files[0]);
		const storageRef = ref(storage, `images/${fileDetails.name}`);
		const uploadTask = uploadBytesResumable(storageRef, fileDetails);

		/* image uploaded */
		/* here we r taking the progress and the url for the image in firebase storage */
		/* on methode takes 4 parameters */

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(Number(progress));
			},
			(error) => {
				console.log(error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref)
					.then((url) => {
						setImage(url);
					})
					.catch((error) => {
						console.log(error.message);
					});
			}
		);
	};

	/* save image to firebase storage  */

	const formik = useFormik({
		initialValues: { placeName: '', link: '', description: '', image: '' },
		onSubmit: (values) => {
			console.log(values);

			/* add data to firestore */
			addDoc(collection(db, 'Posts'), {
				placeName: values.placeName,
				link: values.link,
				image: image,
				description: values.description,
			})
				.then(() => {
					toast.success('Post Added Successfully');
				})
				.catch((error) => {
					toast.error('Something went wrong');
				});

			document.getElementById('placeName').value = '';
			document.getElementById('link').value = '';
			document.getElementById('description').value = '';
			document.getElementById('image').value = '';
			document.getElementById('tempImage').src = gellary;
			setProgress(0);
		},
	});

	return (
		<div className='bg-gray-300 h-screen flex justify-center items-center'>
			<div className='h-super_larg_height w-96 shadow-2xl bg-gray-600 rounded-lg'>
				<form
					onSubmit={formik.handleSubmit}
					className='h-full flex flex-col justify-center items-center '>
					{/* input fields */}
					<input
						ref={imageRef}
						onChange={formik.handleChange}
						value={formik.values.image}
						name='image'
						type='file'
						onChange={handleImageUpload}
						accept='.jpg, .jpeg, .png'
						placeholder='Image'
						className='hidden mb-3 py-1 w-80 rounded-full shadow-md bg-white  px-6 outline-none  tracking-widest text-md'
						id='image'
					/>
					<img
						id='tempImage'
						src={image}
						className=' w-32 h-32 mb-3 cursor-pointer'
						onClick={() => imageRef.current.click()}
					/>
					{progress ? (
						<h1 className='text-pink-500 mb-3'> Uploaded {progress}%</h1>
					) : (
						''
					)}

					<input
						onChange={formik.handleChange}
						value={formik.values.placeName}
						name='placeName'
						type='text'
						placeholder='Place Name'
						className='mb-5 py-1 w-80 rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest text-md '
						id='placeName'
						required
					/>
					<input
						onChange={formik.handleChange}
						value={formik.values.link}
						name='link'
						type='text'
						placeholder='Link'
						className='mb-5 py-1 w-80 rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest text-md'
						id='link'
						required
					/>

					<textarea
						onChange={formik.handleChange}
						value={formik.values.description}
						name='description'
						rows='5'
						cols='50'
						type='text'
						placeholder='Description'
						className='mb-10 py-1 w-80 rounded-md shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest text-md'
						id='description'
						required
					/>
					<button className='bg-pink-600 w-64 text-white rounded-full py-2  hover:shadow-xl font-bold shadow-md transition-all ease-in-out duration-300 hover:bg-opacity-80 '>
						ADD
					</button>
				</form>
			</div>
			<Toaster position='top-right' />
		</div>
	);
};

export default ShareForm;
