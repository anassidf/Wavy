import Post from "./Post.js";
import { useEffect, useState } from "react";
import data from "./data.js";
import Navbar from "./Navbar";
import exploreSVG from "../assets/exploreSVG.svg";
const Explore = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setPosts(data);
  }, []);
  return (
    <div>
      <div className="relative bg-gray-300  h-40 flex items-end justify-center">
        <input
          type="text"
          name=""
          id=""
          className="rounded-t-2xl rounded-b-2xl border-none outline-none pl-5 py-2 mb-8 tracking-widest "
          placeholder="Where to Go?"
          style={{ width: "22rem" }}
        />
      </div>
      <div className="flex flex-wrap justify-start flex-row mx-7 md:mx-11 lg:mx-20 xl:mx-40 my-4 border shadow-xl min-w-min">
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
