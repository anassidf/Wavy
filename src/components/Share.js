import { TextField } from '@mui/material';
import { TextareaAutosize } from '@mui/material';
const Share = () => {
	return (
		<div className='h-screen bg-purple-500 relative'>
			<div className=' pl-6 sm:pl-16 grid grid-cols-2 items-center h-full gap-36'>
				<div className=''>
					<h1 className='text-4xl font-bold '>
						Share youre Experience with Wavy
					</h1>
					<p className='text-lg text-center sm:text-left sm:text-xl mt-9 w-'>
						Now you can share youre experience show youre friends the beauty of
						youre city to encorage them to visit it{' '}
					</p>
				</div>
				{/* share form  */}
				<div className='bg-gray-800 flex flex-col items-center rounded-2xl shadow-md h-96  '>
					<TextField
						label='Title'
						variant='outlined'
						className=''
						defaultValue='anas'
					/>
					<TextareaAutosize
						placeholder='Description'
						variant='standard'
						className='outline-none'
					/>
				</div>
			</div>
		</div>
	);
};

export default Share;
