import { useState, useEffect } from "react";
import levi from "../assets/attack_on_titan_levi.jpg";
import data from "./data";
import reviewsData from "./reviews";
import PostCardInProfilePage from "./PostCardInProfilePage";
import Review from "./Review";
import { FaChevronLeft, FaChevronRight, FaCircle } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { FcEditImage } from "react-icons/fc";
import { BsTelephone } from "react-icons/bs";
import { MdDateRange, MdModeEditOutline } from "react-icons/md";
import EditSettingsDialog from "./EditSettingsDialog";
import BecomeATourGuideForm from "./BecomeATourGuideForm";
import ChangeProfilePicDialog from "./ChangeProfilePicDialog";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
const ProfilePageNew = () => {
  const [profilePicture, setProfilePicture] = useState(levi);
  const [fullName, setFullName] = useState("Mohamed Nserat");
  const [businessEmail, setBusinessEmail] = useState("nserat.m7mad@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("0792063198");
  const [isAvailable, setisAvailable] = useState(true);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [reviews, setReviews] = useState(reviewsData);
  const [isTourGuide, setIsTourGuide] = useState(true);
  const [dob, setDob] = useState("17/11/1999");
  const [city, setCity] = useState("Irbid");
  const [cityToGuideIn, setCityToGuideIn] = useState("");
  const [postIndex, setPostIndex] = useState(0);
  const [likedPostIndex, setLikedPostIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [info, setInfo] = useState(
    "kl;msdlkf andfjknsfdjka ndskjfn akdsjfn jakdnfjkandkjf nakjdf ajaslk dnbfkjasnd fjkansdjkf nasjkd nfjand kjnasd jfnkan dfkjandk sfnakjd nkajdn fkjand "
  );
  const [selectedView, setSelectedView] = useState("posts");
  const [isEditFormOpened, setIsEditFormOpened] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(true);
  const [isChangeProfilePicOpen, setIsChangeProfilePicOpen] = useState(false);
  const [isBecomeATourGuideFormOpened, setIsBecomeATourGuideFormOpened] =
    useState(false);
  const postsCollectionRef = collection(db, "Posts");
  const fetchPosts = async () => {
    setIsPostsLoading(true);
    const data = await getDocs(postsCollectionRef);
    setPosts(
      data.docs.map((doc) => {
        return doc.data();
      })
    );
    setLikedPosts(
      data.docs.map((doc) => {
        return doc.data();
      })
    );
    setIsPostsLoading(false);
  };
  const fetchUserInfo = async () => {
    setIsUserInfoLoading(true);
    const docSnap = await getDoc(doc(db, "Users", auth.currentUser.uid));
    const userData = docSnap.data();
    setFullName(userData.fullName);
    setBusinessEmail(userData.businessEmail);
    setDob(userData.dob);
    setInfo(userData.description);
    setPhoneNumber(userData.phoneNumber);
    setProfilePicture(userData.photo);
    setCity(userData.city);
    setIsTourGuide(userData.isTourGuide);
    setCityToGuideIn(userData.cityToGuideIn);
    userData.status === "Available"
      ? setisAvailable(true)
      : setisAvailable(false);
    setIsUserInfoLoading(false);
  };
  useEffect(() => {
    fetchPosts();
    fetchUserInfo();
  }, []);

  const checkNumberForPosts = (number) => {
    if (number > posts.length - 1) {
      return 0;
    }
    if (number < 0) {
      return posts.length - 1;
    }
    return number;
  };
  const checkNumberForLikedPosts = (number) => {
    if (number > likedPosts.length - 1) {
      return 0;
    }
    if (number < 0) {
      return likedPosts.length - 1;
    }
    return number;
  };
  const checkNumberForReviews = (number) => {
    if (number > reviews.length - 1) {
      return 0;
    }
    if (number < 0) {
      return reviews.length - 1;
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
      {!isEditFormOpened && (
        <div className="flex flex-col mb-7 md:flex-row ">
          {isUserInfoLoading ? (
            <div className="w-full h-screen flex justify-center items-center">
              <h1 className="text-2xl">Loading...</h1>
            </div>
          ) : (
            <section className="mt-20 flex flex-col items-center shadow-xl md:ml-8 md:w-1/3">
              <div
                className="flex self-end justify-start items-center mr-4 mt-4 cursor-pointer"
                onClick={() => setIsEditFormOpened(!isEditFormOpened)}
              >
                <p>Edit</p>
                <MdModeEditOutline size={20} className="ml-1" />
              </div>
              <div className="relative">
                <img
                  src={profilePicture}
                  alt={fullName}
                  className="object-cover rounded-full w-28 h-28 sm:w-44 sm:h-44"
                />

                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full object-cover bg-gray-100 flex justify-center items-center absolute bottom-0 left-0 cursor-pointer">
                  <FcEditImage
                    size={24}
                    onClick={() => setIsChangeProfilePicOpen(true)}
                  />
                </div>
              </div>

              <p className="text-2xl mt-2">{fullName}</p>
              <div className="flex flex-col items-start">
                <div className="flex mt-1 justify-start items-center">
                  <MdDateRange size={20} className="mr-3" />
                  <p className="mt-2">{dob}</p>
                </div>
                <div className="flex mt-1 justify-start items-center">
                  <GoLocation size={20} className="mr-3" />
                  <p className="">{city}</p>
                </div>
                {isTourGuide &&
                  (isAvailable ? (
                    <div className="flex mt-1 justify-start items-center">
                      <FaCircle
                        size={12}
                        className="mr-4 ml-1 text-green-500"
                      />
                      <p className="">Available</p>
                    </div>
                  ) : (
                    <div className="flex mt-1 justify-start items-center">
                      <FaCircle size={12} className="mr-4 ml-1 text-red-500" />
                      <p className="">Reserved</p>
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
              <div className="flex flex-col items-center my-1 sm:items-start mx-4">
                <div className="shadow w-full">
                  <h2 className="pt-2 pl-4 text-xl">About Me:</h2>
                  <p className="px-4 py-1 text-xs sm:text-sm xl:text-base">
                    {info}
                  </p>
                </div>
                <div className="shadow my-3 w-full">
                  <h2 className="pt-2 pl-4 text-xl mb-3">Contact Me:</h2>
                  <div className="px-4 my-2 flex justify-start items-center">
                    <BsTelephone size={20} className="mr-3" />
                    <p className="text-sm md:text-base">{phoneNumber}</p>
                  </div>
                  <div className="px-4 flex justify-start items-center mb-3">
                    <HiOutlineMail size={20} className="mr-3" />
                    <p className="text-sm md:text-base">{businessEmail}</p>
                  </div>
                </div>
              </div>
              {!isTourGuide && (
                <button
                  onClick={() => setIsBecomeATourGuideFormOpened(true)}
                  className=" bg-pink-600 hover:bg-opacity-95 p-3 mb-2 md:mb-4 rounded-full shadow-md text-white transform hover:scale-110 hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  Become a Tour guide
                </button>
              )}
            </section>
          )}

          <section className="shadow-xl flex flex-col mt-10 md:mt-20 md:ml-10 md:mr-5 xl:mr-16 md:w-2/3">
            <div className="flex pt-1 justify-start md:p-3">
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
                  <div className="w-full h-screen flex justify-center items-center">
                    <h1 className="text-2xl">Loading...</h1>
                  </div>
                ) : (
                  <h1>hiii</h1>
                  /* <PostCardInProfilePage post={posts[postIndex]} /> */
                )}
              </div>
            ) : selectedView === "liked posts" ? (
              <div>
                {isPostsLoading ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-2xl">Loading...</h1>
                  </div>
                ) : (
                  <h1>hii</h1>
                  /* <PostCardInProfilePage post={likedPosts[likedPostIndex]} /> */
                )}
              </div>
            ) : (
              <Review review={reviews[reviewIndex]} />
            )}
            <div className="flex justify-around my-5 md:my-12">
              <div
                className="cursor-pointer flex hover:opacity-80"
                onClick={
                  selectedView === "posts"
                    ? prevPost
                    : selectedView === "liked posts"
                    ? prevLikedPost
                    : prevReview
                }
              >
                <FaChevronLeft size={27} className="mr-1 " />
                {selectedView === "reviews" ? (
                  <p>Previous Review</p>
                ) : (
                  <p>Previous Post</p>
                )}
              </div>
              <div
                className="flex cursor-pointer hover:opacity-80"
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
                <FaChevronRight size={27} className="ml-1" />
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
          dob={dob}
          setDob={setDob}
          city={city}
          setCity={setCity}
          info={info}
          setInfo={setInfo}
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
        />
      )}
      {isChangeProfilePicOpen && (
        <ChangeProfilePicDialog
          setIsChangeProfilePicOpen={setIsChangeProfilePicOpen}
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
        />
      )}
    </>
  );
};

export default ProfilePageNew;
