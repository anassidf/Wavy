import React from 'react';
import { useFormik } from 'formik';
import { db, authentication } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const ShareForm = () => {
	const formik = useFormik({
		initialValues: { placeName: '', link: '', description: '', image: '' },
		onSubmit: (values) => {
			console.log(values);
			document.getElementById('placeName').value = '';
			document.getElementById('link').value = '';
			document.getElementById('description').value = '';
			document.getElementById('image').value = '';

			/* add data to firestore */
			addDoc(collection(db, 'Posts'), {
				placeName: values.placeName,
				link: values.link,
				image: values.image,
				description: values.description,
			})
				.then(() => {
					alert('added successfully');
				})
				.catch((error) => {
					console.log(error);
				});
		},
	});

	return (
		<div className='bg-gray-300 h-screen flex justify-center items-center'>
			{/* the form card */}
			<div className='text-3xl font-bold w-80 h-full absolute left-16 top-32 '>
				<p className='hidden xl:inline-block'>
					Describe your place with
					<span className='underline '> best words</span>
				</p>
			</div>

			<div className='h-super_larg_height w-96 shadow-2xl bg-gray-600 rounded-lg'>
				<form
					onSubmit={formik.handleSubmit}
					className='h-full flex flex-col justify-center items-center '>
					{/* input field */}
					<input
						onChange={formik.handleChange}
						value={formik.values.placeName}
						name='placeName'
						type='text'
						placeholder='Place Name'
						className='mb-5 py-1 w-80 rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest text-md '
						id='placeName'
					/>
					<input
						onChange={formik.handleChange}
						value={formik.values.link}
						name='link'
						type='text'
						placeholder='Link'
						className='mb-5 py-1 w-80 rounded-full shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest text-md'
						id='link'
					/>
					<input
						onChange={formik.handleChange}
						value={formik.values.image}
						name='image'
						type='file'
						placeholder='Image'
						className='mb-5 py-1 w-80 rounded-full shadow-md bg-white  px-6 outline-none  tracking-widest text-md'
						id='image'
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
					/>
					<button className='bg-pink-600 w-64 text-white rounded-full py-2  hover:shadow-xl font-bold shadow-md transition-all ease-in-out duration-300 hover:bg-opacity-80 '>
						ADD
					</button>
				</form>
			</div>
		</div>
	);
};

export default ShareForm;
