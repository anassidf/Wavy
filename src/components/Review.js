import levi from "../assets/attack_on_titan_levi.jpg";
import { useState, useEffect } from "react";
const Review = ({ review }) => {
  const { name, text } = review;
  const [profilePicture, setprofilePicture] = useState(levi);
  const [date, setdate] = useState("1/1/2022");
  return (
    <div className="flex flex-col items-center mx-5 my-8 shadow-xl h-full">
      <img
        src={profilePicture}
        alt={name}
        className="w-28 h-28 rounded-full object-cover mt-8"
      />
      <h2 className="text-2xl mt-3">{name}</h2>
      <p className="text-sm">{date}</p>
      <p className="text-sm md:text-base mx-8 my-4">{text}</p>
    </div>
  );
};

export default Review;
