import React from "react";
import { Link } from "react-router-dom";
import herosectionSVG from "../assets/herosectionSVG.svg";
import Share from "./Share";
import RecommendedPlaces from "./RecommendedPlaces";
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";

const Home = () => {
  return (
    <div className=''>
      <div className='h-screen  flex  w-full items-center justify-between bg-green-400  text-white'>
        <div className='m-16 space-y-9 flex flex-col items-center sm:block '>
          <Fade>
            <h1 className='font-bold text-center text-xl sm:text-4xl sm:text-left sm:w-super_larg'>
              If You Dont Know Where To Go In Jordan, Wavy Got You.
            </h1>
            <p className='text-lg text-center sm:text-left sm:text-xl'>
              Offers The Best Jordanian Tour Guides
            </p>
          </Fade>
          <Bounce bottom>
            <Link to='explore'>
              <button className='font-bold bg-pink-600 hover:bg-opacity-95 sm:py-2 sm:px-11 py-1 px-8 rounded-full shadow-md text-gray-300 mt-10 transform hover:scale-110 hover:shadow-xl transition-all duration-300 ease-in-out'>
                Explore
              </button>
            </Link>
          </Bounce>
        </div>
        <img
          src={herosectionSVG}
          alt='svg image'
          className='hidden lg:inline h-96 w-96 mr-32 '
        />
      </div>

      <Share />
      <RecommendedPlaces />
    </div>
  );
};

export default Home;
