import { useEffect, useState } from "react";
import levi from "../assets/attack_on_titan_levi.jpg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import data from "./data";
import reviewsData from "./reviews";
import PostCardInProfilePage from "./PostCardInProfilePage";
import Review from "./Review";
import { FaChevronLeft, FaChevronRight, FaCircle } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

const ProfilePage = () => {
  const [profilePicture, setprofilePicture] = useState(levi);
  const [fullName, setfullName] = useState("Mohamed Nserat");
  const [email, setemail] = useState("nserat.m7mad@gmail.com");
  const [phoneNumber, setphoneNumber] = useState("0792063198");
  const [isAvailable, setisAvailable] = useState(true);
  const [posts, setposts] = useState(data);
  const [likedPosts, setLikedPosts] = useState(data);
  const [reviews, setreviews] = useState(reviewsData);
  const [tabsValue, setTabsValue] = useState("Posts");
  const [dob, setdob] = useState("17/11/1999");
  const [location, setlocation] = useState("Jordan,Irbid");
  const [postIndex, setPostIndex] = useState(0);
  const [LikedPostIndex, setLikedPostIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [info, setinfo] = useState(
    "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, maiores similique unde corporis modi odio adipisci, minus alias obcaecati suscipit, commodi non nihil harum amet omnis rem error sunt accusamus!"
  );

  const handleChange = (event, newValue) => {
    setTabsValue(newValue);
    console.log(posts);
  };
  useEffect(() => {
    setposts(data);
    setLikedPosts(data);
  }, []);
  const checkNumber = (number) => {
    if (number > posts.length - 1) {
      return 0;
    }
    if (number < 0) {
      return posts.length - 1;
    }
    return number;
  };
  const nextPost = () => {
    setPostIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };
  const prevPost = () => {
    setPostIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };
  const nextReview = () => {
    setReviewIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };
  const prevReview = () => {
    setReviewIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };
  const nextLikedPost = () => {
    setLikedPostIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };
  const prevLikedPost = () => {
    setLikedPostIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  return (
    <>
      <div className=" bg-gray-300  h-16 flex items-end justify-center"></div>
      <div className=" h-72 bg-gray-700 w-full">
        <div className=" relative flex pt-12 pl-44 text-white">
          <div>
            <img
              src={profilePicture}
              alt={fullName}
              className="inline object-cover h-32 w-32 rounded-3xl"
            />
          </div>
          <div className="ml-10 ">
            <p className="text-3xl">{fullName}</p>
            <div className="mb-3 mt-2">
              <p className="inline">Born: {dob}</p>
              <div className="pl-6 inline">
                <GoLocation size={18} className="mr-1 text-gray-300 inline" />
                <p className="inline ">{location}</p>
              </div>
              {isAvailable ? (
                <div className="mt-2">
                  <FaCircle size={10} className="inline mr-1 text-green-500" />
                  <p className="mt-2 inline">Available</p>
                </div>
              ) : (
                <div className="mt-2">
                  <FaCircle size={10} className="inline mr-1 text-red-500" />
                  <p className="mt-2 inline">Reserved</p>
                </div>
              )}
            </div>
            <p className="text-gray-400 w-3/5">{info}</p>
          </div>
        </div>
        <section className="absolute left-36 top-80 bg-white rounded-md block shadow-2xl w-1/2">
          <Tabs
            value={tabsValue}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="primary tabs example"
          >
            <Tab value="Posts" label="Posts" />
            <Tab value="LikedPosts" label="Liked Posts" />
            <Tab value="Reviews" label="Reviews" />
          </Tabs>

          <div className="mx-4 mt-4">
            {tabsValue === "Posts" ? (
              <PostCardInProfilePage post={posts[postIndex]} />
            ) : tabsValue === "LikedPosts" ? (
              <PostCardInProfilePage post={likedPosts[LikedPostIndex]} />
            ) : (
              <Review review={reviews[reviewIndex]} />
            )}
            <div className="flex justify-center my-4">
              <FaChevronLeft
                className="w-11 h-11 cursor-pointer inline text-blue-400"
                onClick={
                  tabsValue === "Posts"
                    ? prevPost
                    : tabsValue === "LikedPosts"
                    ? prevLikedPost
                    : prevReview
                }
              />
              <FaChevronRight
                className="w-11 h-11 cursor-pointer inline ml-4 text-blue-400"
                onClick={
                  tabsValue === "Posts"
                    ? nextPost
                    : tabsValue === "LikedPosts"
                    ? nextLikedPost
                    : nextReview
                }
              />
            </div>
          </div>
        </section>
        <section className="absolute top-80 right-28 bg-white rounded-md block shadow-2xl w-1/5 h-60">
          <div className="m-4">
            <h3 className="text-xl">Contact me:</h3>
            <p className="text-base mt-3 mb-2"> {email}</p>
            <div className="flex items-center space-x-1">
              <p className="text-base">{phoneNumber}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
