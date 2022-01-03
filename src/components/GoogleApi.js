import google from "../assets/google.svg";
import { auth, db } from "../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  DocumentSnapshot,
} from "firebase/firestore";
import { Toaster, toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { useState } from "react";
const GoogleApi = ({ action }) => {
  const history = useHistory();
  const googleRegistration = async (e) => {
    e.preventDefault();
    /*  add the provider (google) */
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider)
      .then(async (user) => {
        /* toast.success(
					action === 'login'
						? 'You are loged in'
						: 'Congratulation you are regestered'
				); */

        await setDoc(doc(db, "Users", auth.currentUser.uid), {
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photo: auth.currentUser.photoURL,
          uid: auth.currentUser.uid,
          description: "",
          phoneNumber: "",
          address: "",
          dateOfBirth: "",
          status: "",
          businessEmail: "",
          isTourGuide: false,
          likedPostsID: [],
          postsID: [],
          reviewsID: [],
          cityToGuideIn: "",
          isTourGuideAccepted: false,
        })
          .then((res) => {
            action === "login"
              ? history.push("/profile")
              : history.push(`/additional_data_form/${auth.currentUser.uid}`);
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(
          action === "login" ? "Something went wrong" : "Something went wrong"
        );
      });

    /* finally redirect the user to its own profile page */
  };
  return (
    <div>
      <button
        onClick={googleRegistration}
        className='flex items-center justify-center space-x-2 bg-white rounded-full sm:py-2 sm:w-96 py-1.5 w-72 font-bold shadow-md transition-all ease-in-out duration-300 hover:bg-opacity-80 hover:shadow-xl mt-4 sm:text-lg text-sm'
      >
        <img src={google} alt='google logo' className='h-5 sm:h-8' />
        <h1>
          {action === "login" ? "Login with Google" : "Sign Up with Google"}
        </h1>
      </button>
      <Toaster position='top-right' />
    </div>
  );
};

export default GoogleApi;
