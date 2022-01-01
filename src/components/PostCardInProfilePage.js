import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const PostCardInProfilePage = ({ post }) => {
  const {
    placeName,
    imageUrl: placeImage,
    description: placeInfo,
    createdAt: date,
  } = post;
  const [readMore, setReadMore] = useState(false);
  const history = useHistory();
  const today = new Date();
  /* const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(); */
  useEffect(() => {
    //console.log(post);
  });
  return (
    /* TODO make it responsive */ /* overflow-hidden mx-5 my-8 h-full */
    <article className="bg-white rounded shadow-xl h-full mx-4 my-2 flex flex-col">
      <div className="flex flex-col items-center xl:flex-row xl:items-start mt-5">
        <img
          className="m-2 w-60 h-56 sm:w-64 sm:h-60 lg:w-72 lg:h-64 md:mx-4 aspect-w-16 aspect-h-9 object-cover hover:transition duration-200 ease-in-out transform hover:scale-105"
          src={placeImage}
          alt={placeName}
        />
        <div className="flex flex-col items-center mt-1 xl:items-start mx-4 xl:mx-0">
          <p className="text-2xl">{placeName}</p>
          <p className="text-sm">Published {date}</p>
          <p className=" mt-3 text-sm lg:text-base xl:text-base mx-4 lg:mx-0">
            {readMore ? placeInfo : `${placeInfo.substring(0, 100)}...`}
            <button
              onClick={() => setReadMore(!readMore)}
              className="text-blue-600"
            >
              {readMore ? "..show less" : "read more"}
            </button>
          </p>
        </div>
      </div>
      <div className="mb-2 mt-4 px-4">
        <button className="bg-blue-400 border-0 py-2 px-3 rounded text-white text-base cursor-pointer hover:bg-blue-300">
          Find Tour Guides
        </button>
      </div>
    </article>
  );
};

export default PostCardInProfilePage;
