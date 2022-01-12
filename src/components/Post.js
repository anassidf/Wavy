import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import GuestUser from "../assets/GuestUser.svg";
import { auth, db } from "../firebaseConfig";
import { getDoc, updateDoc, doc } from "firebase/firestore";
const Post = ({ post, currentUserID, likedPosts, setLikedPosts }) => {
  const { createdAt, description, imageUrl, likes, title, uid } = post?.post;
  const [isLiked, setIsLiked] = useState(false);
  const [likesCounter, setLikesCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const history = useHistory();

  const handleLikeClick = async () => {
    setIsLiked(!isLiked);
    let newCount = likesCounter;
    if (currentUserID !== "guest" && !likedPosts?.includes(post?.postID)) {
      likedPosts?.push(post?.postID);
      //update likedPostsID in the user
      await updateDoc(doc(db, "Users", currentUserID), {
        likedPostsID: likedPosts,
      })
        .then(() => {
          setLikedPosts(likedPosts);
        })
        .catch((err) => console.log(err));
      //update the likes counter in the post
      await updateDoc(doc(db, "Posts", post?.postID), {
        likes: likesCounter + 1,
      })
        .then(() => {
          newCount++;
          setLikesCounter(newCount);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleUnLikeClick = async () => {
    setIsLiked(!isLiked);
    let newCount = parseInt(likesCounter);
    if (currentUserID !== "guest" && likedPosts?.includes(post?.postID)) {
      const filteredPosts = likedPosts?.filter((id) => post?.postID !== id);
      //update likedPostsID in the user
      await updateDoc(doc(db, "Users", auth?.currentUser?.uid), {
        likedPostsID: filteredPosts,
      })
        .then(() => {
          setLikedPosts(filteredPosts);
        })
        .catch((err) => console.log(err));
      //update the likes counter in the post
      await updateDoc(doc(db, "Posts", post?.postID), {
        likes: likesCounter - 1,
      })
        .then(() => {
          newCount--;
          if (newCount < 0) {
            setLikesCounter(0);
          } else {
            setLikesCounter(newCount);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleFindTourGuides = () => {
    history?.push(`/tour_guides/${title}`);
  };
  const fetchUserInfo = async () => {
    await getDoc(doc(db, "Users", uid))
      .then((resp) => {
        const userData = resp?.data();
        setFullName(userData?.name);
        setProfilePicture(userData?.photo);
      })
      .catch((err) => console.log(err));
  };
  const checkTheLikedPostsToFlipTheHeartIcon = () => {
    likedPosts?.map((id) => {
      if (post?.postID === id) {
        setIsLiked(!isLiked);
      }
    });
  };
  useEffect(() => {
    setIsLoading(true);
    fetchUserInfo();
    setLikesCounter(parseInt(likes));
    checkTheLikedPostsToFlipTheHeartIcon();
    setIsLoading(false);

    return () => {};
  }, []);
  return isLoading ? (
    <div className='w-full h-screen flex justify-center items-center'>
      <h1 className='text-2xl'>Loading...</h1>
    </div>
  ) : (
    <article className='bg-white border-0 rounded-xl shadow-md overflow-hidden w-80 m-4 min-w-min break-words'>
      <div className='p-0 overflow-hidden mb-2 text-2xl'>
        <img
          className='block min-w-full aspect-w-16 aspect-h-9 max-h-72 w-20 h-96 object-center hover:transition duration-200 ease-in-out transform hover:scale-105'
          src={imageUrl}
          alt={title}
        />
        <div className='flex mt-3 mx-3 p-2'>
          <img
            className='inline object-cover h-14 w-14 rounded-full'
            src={uid === "guest" ? GuestUser : profilePicture}
            alt={fullName}
          />
          <div className='ml-3'>
            {uid === "guest" ? (
              <p className='text-lg font-bold'>Guest</p>
            ) : (
              <Link to={"/profile-page/" + uid}>
                <p className='text-lg font-bold'>{fullName}</p>
              </Link>
            )}

            <p className='text-sm'>{createdAt}</p>
          </div>
        </div>
        <hr className='mx-4' />
        <div className=' m-3'>
          <p className='m-4 mb-0 text-2xl w-60 break-words'>{title}</p>
          <p className='mx-0 my-4 py-0 px-4 text-base h-32 break-words'>
            {description}
          </p>

          <div className='my-4 px-4 pt-0 w-full flex justify-between items-center'>
            <button
              onClick={handleFindTourGuides}
              className='bg-blue-400 border-0 py-2 px-3 inline rounded text-white text-base cursor-pointer hover:bg-blue-300 '
            >
              Find Near Tour Guides
            </button>
            <div className='ml-3 flex items-center'>
              {!isLiked ? (
                <AiOutlineHeart
                  size={30}
                  onClick={handleLikeClick}
                  className='bg-white text-red-400 inline rounded text-base cursor-pointer '
                />
              ) : (
                <AiFillHeart
                  size={30}
                  onClick={handleUnLikeClick}
                  className='bg-white text-red-400 inline rounded text-base cursor-pointer'
                />
              )}
              <p className='text-base text-gray-900 ml-1'>{likesCounter}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
