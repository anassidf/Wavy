import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import RemovePosts from './RemovePosts';
import WaitingPosts from './WaitingPosts';

const Posts = () => {
	return (
		<div className='min-h-screen  w-super_larg'>
			{/* waiting and remove posts */}
			<div>
				<div className='flex  gap-x-10 pt-32   justify-center  '>
					<Link to='/admin/dashboard/posts/waiting'>
						<h1 className='hover:text-gray-400 transition-all duration-300 ease-in-out'>
							Waiting Posts
						</h1>
					</Link>

					<Link to='/admin/dashboard/posts/remove'>
						<h1 className='hover:text-gray-400 transition-all duration-300 ease-in-out'>
							Remove Posts
						</h1>
					</Link>
				</div>

				{/* content */}

				<div>
					<Route
						exact
						path='/admin/dashboard/posts/remove'
						component={RemovePosts}
					/>
					<Route
						exact
						path='/admin/dashboard/posts/waiting'
						component={WaitingPosts}
					/>
				</div>
			</div>
		</div>
	);
};

export default Posts;
