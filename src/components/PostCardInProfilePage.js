import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const PostCardInProfilePage = ({ post }) => {
  const { placeName, placeImage, placeInfo } = post;
  const [readMore, setReadMore] = useState(false);
  const history = useHistory();
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return (
    <article className="bg-white border-0 rounded shadow overflow-hidden h-full w-full min-w-min">
      <div className="p-0 overflow-hidden mb-2 text-2xl">
        <img
          className="block min-w-full aspect-w-16 aspect-h-9 max-h-72 object-cover object-center hover:transition duration-200 ease-in-out transform hover:scale-105"
          src={placeImage}
          alt={placeName}
        />

        <hr className="mx-4" />
        <div className=" m-3">
          <p className="m-4 mb-0 text-2xl">{placeName}</p>
          <p className="text-sm ml-4">Published {date}</p>
          <p className="mx-0 my-4 py-0 px-4 text-base">
            {readMore ? placeInfo : `${placeInfo.substring(0, 100)}...`}
            <button
              onClick={() => setReadMore(!readMore)}
              className="text-blue-600"
            >
              {readMore ? "..show less" : "read more"}
            </button>
          </p>
          <div className="my-4 px-4">
            <button className="bg-blue-400 border-0 py-2 px-3 rounded text-white text-base cursor-pointer hover:bg-blue-300">
              Find Tour Guides
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCardInProfilePage;
