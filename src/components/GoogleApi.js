import google from '../assets/google.svg';
import { authentication, db } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const GoogleApi = ({ action }) => {
	const googleRegistration = async (e) => {
		e.preventDefault();
		/*  add the provider (google) */
		const provider = new GoogleAuthProvider();

		await signInWithPopup(authentication, provider)
			.then((userData) => {
				console.log(userData);
			})
			.catch((error) => {
				alert(error);
			});

		/*  add the user to the database */

		await setDoc(doc(db, 'Users', authentication.currentUser.uid), {
			name: authentication.currentUser.displayName,
			email: authentication.currentUser.email,
			photo: authentication.currentUser.photoURL,
			uid: authentication.currentUser.uid,
			description: '',
		})
			.then((res) => {
				alert('added successfully');
			})
			.catch((err) => {
				alert(err);
			});

		/* finally redirect the user to its own profile page */
	};
	return (
		<div>
			<button
				onClick={googleRegistration}
				className='flex items-center justify-center space-x-2 bg-white rounded-full w-96 py-2 font-bold shadow-md transition-all ease-in-out duration-300 hover:bg-opacity-80 hover:shadow-xl mt-4'>
				<img src={google} alt='google logo' className='h-8' />
				<h1>
					{action === 'login' ? 'Login with Google' : 'Sign Up with Google'}
				</h1>
			</button>
		</div>
	);
};

export default GoogleApi;
