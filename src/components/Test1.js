import React from 'react';
import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';
const Test1 = () => {
	return (
		<div className='min-h-screen mt-32'>
			<Menu>
				<Menu.Button>More</Menu.Button>
				<Menu.Items
					as='div'
					className='border-2 border-black w-32 bg-gray-500 rounded-lg transition-all duration-300 ease-in-out'>
					<Menu.Item
						as='div'
						className='text-red-500 hover:bg-black hover:bg-opacity-70'>
						<h1>anas</h1>
					</Menu.Item>
					<Menu.Item>
						<h1>dwd</h1>
					</Menu.Item>
					<Menu.Item disabled>
						<span className='opacity-75'>Invite a friend (coming soon!)</span>
					</Menu.Item>
				</Menu.Items>
			</Menu>
		</div>
	);
};

export default Test1;
