import { useEffect, useState } from "react";
import levi from "../assets/attack_on_titan_levi.jpg";
import phoneNumberIcon from "../assets/phoneNumberIcon.svg";

const ProfilePage = () => {
  const [profilePicture, setprofilePicture] = useState(levi);
  const [fullName, setfullName] = useState("Mohamed Nserat");
  const [email, setemail] = useState("nserat.m7mad@gmail.com");
  const [phoneNumber, setphoneNumber] = useState("0792063198");
  const [isAvailable, setisAvailable] = useState(true);
  const [posts, setposts] = useState([]);
  const [reviews, setreviews] = useState([]);
  const [dob, setdob] = useState("17/11/1999");
  const [location, setlocation] = useState("Jordan,Irbid");
  const [info, setinfo] = useState(
    "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, maiores similique unde corporis modi odio adipisci, minus alias obcaecati suscipit, commodi non nihil harum amet omnis rem error sunt accusamus!"
  );

  return (
    <>
      <div className=" bg-gray-300  h-16 flex items-end justify-center"></div>
      <div className="relative h-72 bg-gray-700" style={{ width: "100%" }}>
        <div className="flex pt-12 pl-44 text-white z-0">
          <div>
            <img
              src={profilePicture}
              alt="Levi"
              className="inline object-contain h-32 rounded-full min-w-min w-32"
              /* style={{ width: "8rem" }} */
            />
          </div>
          <div className="ml-10">
            <p className="text-3xl">{fullName}</p>
            <div className="mb-3 mt-2">
              <p className="inline">Born: {dob}</p>
              <p className="inline pl-14 text-blue-300">{location}</p>
              {isAvailable ? (
                <p className="text-green-500 mt-2">Available</p>
              ) : (
                <p className="text-red-500 mt-2">Busy</p>
              )}
            </div>
            <p className="text-gray-400" style={{ width: "70%" }}>
              {info}
            </p>
          </div>
        </div>
        <section
          className="bg-white absolute left-24 top-64 rounded-md block shadow-2xl"
          style={{ width: "70%", height: "500px" }}
        ></section>
        <section
          className="bg-white absolute right-7 top-64 rounded-md block shadow-2xl"
          style={{ width: "20%", height: "250px" }}
        >
          <div className="m-4">
            <h3 className="text-xl">Contact me:</h3>
            <p className="text-base mt-3 mb-2"> {email}</p>
            <div className="flex items-center space-x-1">
              {/* <img src={phoneNumberIcon} alt="" className="h-6" /> */}
              <p className="text-base">{phoneNumber}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
