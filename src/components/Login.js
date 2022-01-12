import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import GoogleApiLogIn from "./GoogleApiLogIn";
import Fade from "react-reveal/Fade";

const Login = () => {
  return (
    <div className='h-screen bg-gray-300 flex  justify-center items-center'>
      <div className='bg-signUp bg-center bg-cover filter blur-sm h-screen absolute top-0 right-0 left-0 '>
        {/* <div className='bg-black absolute top-0 left-0 right-0  h-full bg-opacity-50'></div> */}
      </div>
      <Fade>
        <div className='z-10 bg-blue-200 flex flex-col  justify-center items-center h-super_larg_height2 w-additional_user_data2 lg:w-additional_user_data1   rounded-lg shadow-lg bg-opacity-80 relative '>
          <GoogleApiLogIn />
          <Link to='/registration' className=''>
            <h1 className='text-blue-700 text-sm sm:text-lg mt-6'>
              If you dont have an account Sign Up
            </h1>
          </Link>
        </div>
      </Fade>

      <Toaster position='top-center' />
    </div>
  );
};

export default Login;
