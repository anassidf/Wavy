import google from "../assets/google.svg";
import { auth, db } from "../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Toaster, toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showUser, hideUser } from "../redux/reducers/userSlice";

const GoogleApiLogIn = () => {
  const showState = useSelector((state) => {
    return state.showUser.showUser;
  });
  const dispatch = useDispatch();

  const history = useHistory();
  const googleLogin = async (e) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider)
      .then(async (user) => {
        /* check if the account already registered */
        const userChecker = await getDoc(doc(db, "Users", user.user.uid));

        if (userChecker.data() === undefined) {
          toast.error("This Account is Not Registered");

          /* update show state to false */
          dispatch(hideUser());
        } else {
          if (userChecker.data().blocked) {
            toast.error("This Account is Blocked");
            dispatch(hideUser());
          } else {
            history.push(`/profile-page/${user.user.uid}`);
            /* update the state to true */
            dispatch(showUser());
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Something went wrong");
      });

    /* finally redirect the user to its own profile page */
  };
  return (
    <div>
      <button
        onClick={googleLogin}
        className='flex items-center justify-center space-x-2 bg-white rounded-md sm:py-2 sm:w-96 py-1.5 w-72 font-bold shadow-md transition-all ease-in-out duration-300 hover:bg-opacity-80 hover:shadow-xl mt-4 sm:text-lg text-sm'
      >
        <img src={google} alt='google logo' className='h-5 sm:h-8' />
        <h1>Log In with Google</h1>
      </button>
      <Toaster position='top-center' />
    </div>
  );
};

export default GoogleApiLogIn;
