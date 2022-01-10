import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
const Review = ({ review }) => {
  const { description, createdAt, fromID } = review;
  const [reviewerFullName, setReviewerFullName] = useState("");
  const [reviewerProfilePicture, setReviewerProfilePicture] = useState("");

  const fetchUserInfo = async () => {
    const docSnap = await getDoc(doc(db, "Users", fromID));
    const userData = docSnap.data();
    setReviewerFullName(userData.name);
    setReviewerProfilePicture(userData.photo);
  };
  useEffect(() => {
    fetchUserInfo();
    return () => {};
  }, []);
  return (
    <div className='flex flex-col items-center mx-5 mt-8 shadow-xl h-full'>
      <img
        src={reviewerProfilePicture}
        alt={reviewerFullName}
        className='w-28 h-28 rounded-full object-cover mt-8'
      />
      <h2 className='text-2xl mt-3'>{reviewerFullName}</h2>
      <p className='text-sm'>{createdAt}</p>
      <p className='text-sm md:text-base mx-8 my-4'>{description}</p>
    </div>
  );
};

export default Review;
