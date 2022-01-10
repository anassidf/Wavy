import { useState, useEffect } from "react";
import levi from "../assets/attack_on_titan_levi.jpg";
import { useParams, useHistory } from "react-router-dom";
import reviewsData from "./reviews";
import emptyData from "../assets/emptyData.svg";
import PostCardInProfilePage from "./PostCardInProfilePage";
import Review from "./Review";
import { FaChevronLeft, FaChevronRight, FaCircle } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { FcEditImage } from "react-icons/fc";
import { BsTelephone } from "react-icons/bs";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { MdDateRange, MdModeEditOutline } from "react-icons/md";
import EditSettingsDialog from "./EditSettingsDialog";
import BecomeATourGuideForm from "./BecomeATourGuideForm";
import ChangeProfilePicDialog from "./ChangeProfilePicDialog";
import { auth, db } from "../firebaseConfig";
import data from "./data";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  documentId,
} from "firebase/firestore";
import ReviewForm from "./reviewForm";
const ProfilePageNew = () => {
  const [profilePicture, setProfilePicture] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAvailable, setisAvailable] = useState(true);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isTourGuide, setIsTourGuide] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [cityToGuideIn, setCityToGuideIn] = useState("");
  const [postIndex, setPostIndex] = useState(0);
  const [likedPostIndex, setLikedPostIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [info, setInfo] = useState("");
  const [selectedView, setSelectedView] = useState("posts");
  const [isEditFormOpened, setIsEditFormOpened] = useState(false);
  const [isProfilePageLoading, setIsProfilePageLoading] = useState(true);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [islikedPostsLoading, setIslikedPostsLoading] = useState(true);
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(true);
  const [isChangeProfilePicOpen, setIsChangeProfilePicOpen] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isBecomeATourGuideFormOpened, setIsBecomeATourGuideFormOpened] =
    useState(false);
  const params = useParams();
  const uid = params?.uid;
  const [currentUserID, setCurrentUserID] = useState("");

  const fetchPosts = async () => {
    setIsPostsLoading(true);
    let arrayOfPosts = [];
    await getDoc(doc(db, "Users", uid))
      .then((resp) => {
        const userData = resp?.data();
        userData?.postsID?.map(async (id) => {
          await getDoc(doc(db, "Posts", id))
            .then((resp) => {
              const postData = resp?.data();
              arrayOfPosts?.push(postData);
            })
            .catch((err) => console.log(err));
        });
        setPosts(arrayOfPosts);
        setIsPostsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const fetchlikedPosts = async () => {
    setIslikedPostsLoading(true);
    let arrayOfLikedPosts = [];
    await getDoc(doc(db, "Users", uid))
      .then((resp) => {
        const userData = resp?.data();
        userData?.likedPostsID?.map(async (id) => {
          await getDoc(doc(db, "Posts", id))
            .then((resp) => {
              const postData = resp?.data();
              arrayOfLikedPosts?.push(postData);
            })
            .catch((err) => console.log(err));
        });

        setLikedPosts(arrayOfLikedPosts);
        setIslikedPostsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const fetchReviews = async () => {
    setIsReviewsLoading(true);
    let arrayOfReviews = [];
    await getDoc(doc(db, "Users", uid))
      .then((resp) => {
        const userData = resp?.data();
        userData?.reviewsID?.map(async (id) => {
          await getDoc(doc(db, "reviews", id))
            .then((resp) => {
              const reviewData = resp?.data();
              arrayOfReviews?.push(reviewData);
            })
            .catch((err) => console.log(err));
        });
        setReviews(arrayOfReviews);
        setTimeout(() => {
          setIsReviewsLoading(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  };
  const fetchUserInfo = async () => {
    setIsUserInfoLoading(true);
    await getDoc(doc(db, "Users", uid))
      .then((resp) => {
        const userData = resp?.data();
        setFullName(userData?.name);
        setBusinessEmail(userData?.businessEmail);
        setDateOfBirth(userData?.dateOfBirth);
        setInfo(userData?.description);
        setPhoneNumber(userData?.phoneNumber);
        setProfilePicture(userData?.photo);
        setAddress(userData?.address);
        setIsTourGuide(userData?.isTourGuide);
        setCityToGuideIn(userData?.cityToGuideIn);
        userData?.status === "Available"
          ? setisAvailable(true)
          : setisAvailable(false);
        setIsUserInfoLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setIsProfilePageLoading(true);
    fetchPosts();
    fetchlikedPosts();
    fetchUserInfo();
    //check if the user logged in or not
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserID(auth?.currentUser?.uid);
      } else {
        setCurrentUserID("guest");
      }
    });
    setTimeout(() => {
      setIsProfilePageLoading(false);
    }, 2000);
  }, [uid]);
  useEffect(() => {
    fetchReviews();

    return () => {};
  }, [isReviewFormOpen, uid]);
  const checkNumberForPosts = (number) => {
    if (number > posts?.length - 1) {
      return 0;
    }
    if (number < 0) {
      return posts?.length - 1;
    }
    return number;
  };
  const checkNumberForLikedPosts = (number) => {
    if (number > likedPosts?.length - 1) {
      return 0;
    }
    if (number < 0) {
      return likedPosts?.length - 1;
    }
    return number;
  };
  const checkNumberForReviews = (number) => {
    if (number > reviews?.length - 1) {
      return 0;
    }
    if (number < 0) {
      return reviews?.length - 1;
    }
    return number;
  };
  const nextPost = () => {
    setPostIndex((index) => {
      let newIndex = index + 1;
      return checkNumberForPosts(newIndex);
    });
  };
  const prevPost = () => {
    setPostIndex((index) => {
      let newIndex = index - 1;
      return checkNumberForPosts(newIndex);
    });
  };
  const nextReview = () => {
    setReviewIndex((index) => {
      let newIndex = index + 1;
      return checkNumberForReviews(newIndex);
    });
  };
  const prevReview = () => {
    setReviewIndex((index) => {
      let newIndex = index - 1;
      return checkNumberForReviews(newIndex);
    });
  };
  const nextLikedPost = () => {
    setLikedPostIndex((index) => {
      let newIndex = index + 1;
      return checkNumberForLikedPosts(newIndex);
    });
  };
  const prevLikedPost = () => {
    setLikedPostIndex((index) => {
      let newIndex = index - 1;
      return checkNumberForLikedPosts(newIndex);
    });
  };

  return (
    /* TODO make it responsive */ /*  */
    <>
      {isProfilePageLoading ? (
        <div className='w-full h-screen flex justify-center items-center'>
          {Loading.circle()}
        </div>
      ) : (
        <div className='flex flex-col mb-7 md:flex-row '>
          {Loading.remove()}
          {isUserInfoLoading ? (
            <div className='w-full h-screen flex justify-center items-center'>
              {Loading.circle()}
            </div>
          ) : (
            <section className='mt-20 flex flex-col items-center shadow-xl md:ml-8 md:w-1/3'>
              {Loading.remove()}
              {currentUserID === uid && (
                <div
                  className='flex self-end justify-start items-center mr-4 mt-4 cursor-pointer'
                  onClick={() => setIsEditFormOpened(!isEditFormOpened)}
                >
                  <p>Edit</p>
                  <MdModeEditOutline size={20} className='ml-1' />
                </div>
              )}

              <div className='relative'>
                <img
                  src={profilePicture}
                  alt={fullName}
                  className='object-cover rounded-full w-28 h-28 sm:w-44 sm:h-44'
                />
                {currentUserID === uid && (
                  <div className='w-8 h-8 sm:w-11 sm:h-11 rounded-full object-cover bg-gray-100 flex justify-center items-center absolute bottom-0 left-0 cursor-pointer'>
                    <FcEditImage
                      size={24}
                      onClick={() => setIsChangeProfilePicOpen(true)}
                    />
                  </div>
                )}
              </div>

              <p className='text-xl sm:text-2xl text-center sm:mx-0 mt-2 overflow-hidden break-words'>
                {fullName}
              </p>
              <div className='flex flex-col items-start'>
                <div className='flex mt-1 justify-start items-center'>
                  <MdDateRange size={20} className='mr-3' />
                  <p className='mt-2 text-center'>{dateOfBirth}</p>
                </div>
                <div className='flex mt-1 justify-start items-center overflow-hidden'>
                  <GoLocation size={20} className='mr-3' />
                  <p className='text-center break-words'>{address}</p>
                </div>
                {isTourGuide &&
                  (isAvailable ? (
                    <div className='flex mt-1 justify-start items-center'>
                      <FaCircle
                        size={12}
                        className='mr-4 ml-1 text-green-500'
                      />
                      <p className=''>Available</p>
                    </div>
                  ) : (
                    <div className='flex mt-1 justify-start items-center'>
                      <FaCircle size={12} className='mr-4 ml-1 text-red-500' />
                      <p className=''>Reserved</p>
                    </div>
                  ))}
              </div>
              {/* {isTourGuide && (
                <div className="">
                  <p className="text-black">
                    I Can Guide in {cityToGuideIn} City!
                  </p>
                </div>
              )} */}
              <div className='flex flex-col items-center my-1 sm:items-start mx-4 w-60 sm:w-80 md:w-56 lg:w-72 xl:w-96'>
                <div className='shadow w-full'>
                  <h2 className='pt-2 pl-4 text-xl'>About Me:</h2>
                  <p className='px-4 py-1 text-xs sm:text-sm xl:text-base break-words'>
                    {info}
                  </p>
                </div>
                <div className='shadow my-3 w-full overflow-hidden'>
                  <h2 className='pt-2 pl-4 text-xl mb-3'>Contact Me:</h2>
                  <div className='px-4 my-2 flex justify-start items-center'>
                    <BsTelephone size={20} className='mr-3' />
                    <p className='text-sm md:text-base'>{phoneNumber}</p>
                  </div>
                  <div className='px-4 flex justify-start items-center mb-3'>
                    <HiOutlineMail size={20} className='mr-3' />
                    <p className='text-sm md:text-base break-words'>
                      {businessEmail}
                    </p>
                  </div>
                </div>
              </div>
              {currentUserID === uid && !isTourGuide && (
                <button
                  onClick={() => setIsBecomeATourGuideFormOpened(true)}
                  className=' bg-pink-600 hover:bg-opacity-95 p-3 mb-2 md:mb-4 rounded-full shadow-md text-white transform hover:scale-110 hover:shadow-xl transition-all duration-300 ease-in-out'
                >
                  Become a Tour guide
                </button>
              )}
              {currentUserID !== uid && isTourGuide && (
                <button
                  onClick={() => {
                    setIsReviewFormOpen(true);
                  }}
                  className=' bg-pink-600 hover:bg-opacity-95 p-3 mb-2 md:mb-4 rounded-full shadow-md text-white transform hover:scale-110 hover:shadow-xl transition-all duration-300 ease-in-out'
                >
                  Make a Review
                </button>
              )}
            </section>
          )}

          <section className='shadow-xl flex flex-col mt-10 md:mt-20 md:ml-10 md:mr-5 xl:mr-16 md:w-2/3'>
            <div className='flex pt-1 justify-start md:p-3'>
              <p
                className={
                  selectedView === "posts"
                    ? "mx-5 border-b-2 border-black cursor-pointer"
                    : "mx-5 text-gray-400 cursor-pointer"
                }
                onClick={() => setSelectedView("posts")}
              >
                Posts
              </p>
              {currentUserID === uid && (
                <p
                  className={
                    selectedView === "liked posts"
                      ? "mx-5 cursor-pointer border-b-2 border-black"
                      : "mx-5 text-gray-400 cursor-pointer"
                  }
                  onClick={() => setSelectedView("liked posts")}
                >
                  Liked Posts
                </p>
              )}

              <p
                className={
                  selectedView === "reviews"
                    ? "mx-5 border-b-2 border-black cursor-pointer"
                    : "mx-5 text-gray-400 cursor-pointer"
                }
                onClick={() => setSelectedView("reviews")}
              >
                Reviews
              </p>
            </div>
            {selectedView === "posts" ? (
              <div>
                {isPostsLoading ? (
                  <div className='w-full h-screen flex justify-center items-center'>
                    <h1 className='text-2xl'>Loading...</h1>
                  </div>
                ) : posts.length > 0 ? (
                  <PostCardInProfilePage post={posts[postIndex]} />
                ) : (
                  <div className='flex items-center justify-center flex-col mt-24 mb-24 mx-2'>
                    <img
                      src={emptyData}
                      alt='Empty Data!'
                      className='w-72 h-72'
                    />
                    <p className='text-gray-400 text-xl sm:text-3xl'>
                      No Data Found!
                    </p>
                  </div>
                )}
              </div>
            ) : selectedView === "liked posts" ? (
              <div>
                {islikedPostsLoading ? (
                  <div className='w-full h-full flex justify-center items-center'>
                    <h1 className='text-2xl'>Loading...</h1>
                  </div>
                ) : likedPosts.length > 0 ? (
                  <PostCardInProfilePage post={likedPosts[likedPostIndex]} />
                ) : (
                  <div className='flex items-center justify-center flex-col mt-24 mb-24 mx-2'>
                    <img
                      src={emptyData}
                      alt='Empty Data!'
                      className='w-72 h-72'
                    />
                    <p className='text-gray-400 text-xl sm:text-3xl'>
                      No Data Found!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {isReviewsLoading ? (
                  <div className='w-full h-full flex justify-center items-center'>
                    <h1 className='text-2xl'>Loading...</h1>
                  </div>
                ) : reviews.length > 0 ? (
                  <Review review={reviews[reviewIndex]} />
                ) : (
                  <div className='flex items-center justify-center flex-col mt-24 mb-24 mx-2'>
                    <img
                      src={emptyData}
                      alt='Empty Data!'
                      className='w-72 h-72'
                    />
                    <p className='text-gray-400 text-xl sm:text-3xl '>
                      No Data Found!
                    </p>
                  </div>
                )}
              </div>
            )}
            <div className='flex justify-around my-3 md:my-14 '>
              <div
                className='cursor-pointer flex hover:opacity-80 text-sm sm:text-base items-center'
                onClick={
                  selectedView === "posts"
                    ? prevPost
                    : selectedView === "liked posts"
                    ? prevLikedPost
                    : prevReview
                }
              >
                <FaChevronLeft size={27} className='mr-1 ' />
                {selectedView === "reviews" ? (
                  <p>Previous Review</p>
                ) : (
                  <p>Previous Post</p>
                )}
              </div>
              <div
                className='flex cursor-pointer hover:opacity-80 text-sm sm:text-base items-center'
                onClick={
                  selectedView === "posts"
                    ? nextPost
                    : selectedView === "liked posts"
                    ? nextLikedPost
                    : nextReview
                }
              >
                {selectedView === "reviews" ? (
                  <p>Next Review</p>
                ) : (
                  <p>Next Post</p>
                )}
                <FaChevronRight size={27} className='ml-1' />
              </div>
            </div>
          </section>
        </div>
      )}
      {isEditFormOpened && (
        <EditSettingsDialog
          trigger={isEditFormOpened}
          isEditFormOpened={isEditFormOpened}
          setIsEditFormOpened={setIsEditFormOpened}
          fullName={fullName}
          setFullName={setFullName}
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          businessEmail={businessEmail}
          setBusinessEmail={setBusinessEmail}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          address={address}
          setAddress={setAddress}
          info={info}
          setInfo={setInfo}
          cityToGuideIn={cityToGuideIn}
          setCityToGuideIn={setCityToGuideIn}
          isAvailable={isAvailable}
          setisAvailable={setisAvailable}
          isTourGuide={isTourGuide}
        />
      )}
      {isBecomeATourGuideFormOpened && (
        <BecomeATourGuideForm
          setIsBecomeATourGuideFormOpened={setIsBecomeATourGuideFormOpened}
          cityToGuideIn={cityToGuideIn}
          setCityToGuideIn={setCityToGuideIn}
          setIsTourGuide={setIsTourGuide}
        />
      )}
      {isChangeProfilePicOpen && (
        <ChangeProfilePicDialog
          setIsChangeProfilePicOpen={setIsChangeProfilePicOpen}
          setProfilePicture={setProfilePicture}
        />
      )}
      {isReviewFormOpen && (
        <ReviewForm
          setIsReviewFormOpen={setIsReviewFormOpen}
          currentUserID={currentUserID}
          uid={uid}
          setReviews={setReviews}
          reviews={reviews}
        />
      )}
    </>
  );
};

export default ProfilePageNew;
