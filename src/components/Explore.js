import Post from "./Post";
import { useEffect, useState } from "react";
import data from "./data";
const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const doSearch = (cards) => {
    return cards.filter((card) => {
      if (search === "") return card;
      else return card.placeName.toLowerCase().includes(search.toLowerCase());
    });
  };
  useEffect(() => {
    setPosts(data);
  }, []);
  return (
    <>
      <div className="relative bg-gray-300  h-40 flex items-end justify-center">
        <input
          type="text"
          value={search}
          className="rounded-t-2xl rounded-b-2xl border-none outline-none pl-5 py-2 mb-8 tracking-widest w-80 mx-12 min-w-min"
          placeholder="Where to Go?"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-start flex-row mx-7 md:mx-11 lg:mx-20 xl:mx-40 my-4 min-w-min">
        {doSearch(posts).length !== 0 ? (
          doSearch(posts).map((post, index) => <Post post={post} key={index} />)
        ) : (
          <h1>There are no places match what you want!</h1>
        )}
      </div>
    </>
  );
};

export default Explore;
