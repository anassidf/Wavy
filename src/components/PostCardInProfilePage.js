import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const PostCardInProfilePage = ({ post }) => {
  const {
    title: placeName,
    imageUrl: placeImage,
    description: placeInfo,
    createdAt: date,
  } = post;
  const history = useHistory();
  const handleFindTourGuides = () => {
    history.push(`/tour_guides/${placeName}`);
  };
  useEffect(() => {
    //console.log(post);
  });
  return (
    <article className='bg-white rounded shadow-xl h-full mx-4 mt-2 flex flex-col items-center xl:items-start'>
      <div className='flex flex-col items-center xl:flex-row xl:items-start mt-5'>
        <img
          className='m-2 w-60 h-56 sm:w-64 sm:h-60 lg:w-72 lg:h-64 md:mx-4 aspect-w-16 aspect-h-9 object-fill hover:transition duration-200 ease-in-out transform hover:scale-105'
          src={placeImage}
          alt={placeName}
        />
        <div className='flex flex-col items-center mt-1 xl:items-start mx-4 xl:mx-0'>
          <p className='text-2xl break-words'>{placeName}</p>
          <p className='text-sm'>Published {date}</p>
          <p className=' mt-3 text-sm lg:text-base xl:text-base mx-4 lg:mx-0 break-words'>
            {placeInfo}
          </p>
        </div>
      </div>
      <div className='mb-2 mt-4 px-4'>
        <button
          onClick={handleFindTourGuides}
          className='bg-blue-400 border-0 py-2 px-3 rounded text-white text-base cursor-pointer hover:bg-blue-300'
        >
          Find Near Tour Guides
        </button>
      </div>
    </article>
  );
};

export default PostCardInProfilePage;
