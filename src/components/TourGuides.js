import React, { useState } from 'react';

const TourGuides = () => {
	const [tourGuides, setTourGuides] = useState([
		{
			name: 'anas',
			age: '23',
			description: 'this is anas description',
			dateOfBirth: '04-01-1999',
		},
	]);

	return (
		<div className='min-h-screen flex justify-center flex-wrap'>
			{/* card container */}
			<div className='lg:w-super_larg text-center lg:text-left lg:min-h-72 h-super_larg_height w-72 bg-yellow-600 mt-24 mr-5 ml-5 rounded-md  flex flex-col lg:flex lg:flex-row  relative shadow-xl'>
				<div className='lg:w-80 w-full'>
					<img
						className=' h-full lg:rounded-tl-md lg:rounded-bl-md rounded-tr-md rounded-tl-md lg:rounded-tr-none'
						src='https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg'
						alt=''
					/>
				</div>

				<div className='mt-16 lg:ml-5 lg:w-text_width text-white flex justify-center flex-col'>
					<p className='font-bold text-lg mb-5'> Anas Alfateh</p>
					<p className='text-xs mb-1'>Born: 01-04-1999</p>
					<p className='text-xs mb-3'> Address: Jordan, Irbed</p>
					<p className='lg:mr-5 lg:ml-0 text-xs ml-5 mr-5'>
						i am anas and i am the best tour guide u would ever havei am anas
						and i am the best tour guide u would ever havei am anas and i am the
						best tour guide u would ever havei am anas and i am the best tour
						guide u would ever havei am anas and i am the best tour guide u i am
					</p>

					{/* small squars */}
					<div className='lg:flex lg:flex-row mt-7 items-center  lg:justify-between  flex flex-col lg:ml-0 lg:mr-0 ml-1 mr-1 '>
						<div className='flex mb-3 items-center flex-wrap justify-center gap-1'>
							<section className='flex  items-center space-x-1 text-xs  px-7 py-0.5 bg-black bg-opacity-60 rounded-sm'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-4 w-4'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
									/>
								</svg>
								<span>Petra</span>
							</section>

							<section className='flex  items-center space-x-1 text-xs px-7 py-0.5 bg-black bg-opacity-60 rounded-sm'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-4 w-4'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
									/>
								</svg>
								<span>Petra</span>
							</section>
						</div>
						<button className='text-xs bg-purple-800  rounded-sm px-7 py-0.5 h-5 lg:mr-5 mb-5'>
							Reserve
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TourGuides;
