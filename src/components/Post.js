import levi from "../assets/attack_on_titan_levi.jpg";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const Post = ({ post }) => {
  const { placeName, placeImage, placeInfo } = post;
  const history = useHistory();
  useEffect(() => {
    console.log(post);
  }, []);
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return (
    <article
      className="bg-white border-0 rounded shadow overflow-hidden h-full m-4 min-w-min flex-auto 2xl:flex-none"
      style={{ width: "22rem" }}
    >
      <div className="p-0 overflow-hidden mb-2 text-2xl">
        <img
          className="block min-w-full aspect-w-16 aspect-h-9 max-h-72 object-cover object-center hover:transition duration-200 ease-in-out transform hover:scale-105"
          src={placeImage}
          alt={placeName}
        />

        <div className="flex mt-3 mx-3 p-2">
          <img
            className="inline object-cover h-14 rounded-full"
            src={levi}
            alt="levi"
            style={{ width: "3.5rem" }}
          />
          <div className="ml-3">
            <p className="text-lg font-bold">Levi Sensie</p>
            <p className="text-sm">{date}</p>
          </div>
        </div>
        <hr className="mx-4" />
        <div className=" m-3">
          <p className="m-4 mb-0 text-2xl">{placeName}</p>
          <p className="mx-0 my-4 py-0 px-4 text-base max-h-32 overflow-hidden">
            {placeInfo}
          </p>
          <div className="my-4 px-4 pt-0">
            <button className="bg-blue-400 border-0 py-2 px-3 rounded text-white text-base cursor-pointer hover:bg-blue-300 focus:bg-blue-300">
              Find Tour Guides
            </button>
            <button className="btn bg-white border border-solid border-blue-400 text-blue-400 py-2 px-3 rounded text-base cursor-pointer hover:bg-blue-100 focus:bg-blue-100 ml-1">
              Like
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
