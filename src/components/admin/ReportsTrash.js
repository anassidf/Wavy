import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  doc,
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { toast, Toaster } from "react-hot-toast";
import noData from "../../assets/noData.svg";
import Bounce from "react-reveal/Bounce";

const ReportsTrash = () => {
  const [data, setData] = useState([]);
  const [ids, setIds] = useState([]);
  useEffect(async () => {
    /*  getting posts data */
    const docsRef = query(
      collection(db, "Reports"),
      where("trashed", "==", true)
    );
    const posts = await getDocs(docsRef);
    let temp = new Array();
    let ids = new Array();
    posts.forEach((post) => {
      temp.push(post.data());
      ids.push(post.id);
    });

    setData(temp);
    setIds(ids);
  }, []);

  /* delete post methode */
  const deleteReport = async (index) => {
    let postID = ids[index];

    /* delete post proccess */
    Confirm.show(
      "Delete Report Permanently",
      "Are you sure?",
      "Yes",
      "No",
      async () => {
        await deleteDoc(doc(db, "Reports", postID));
        toast.success("Report Deleted Successfully");
      },
      () => {},
      {}
    );
  };
  const retrieveReport = (index) => {
    let postID = ids[index];

    /* delete post proccess */
    Confirm.show(
      "Retrieve Report",
      "Are you sure?",
      "Yes",
      "No",
      async () => {
        await updateDoc(doc(db, "Reports", postID), {
          trashed: false,
        });
        toast.success("Report Retrieved Successfully");
      },
      () => {},
      {}
    );
  };
  return (
    <div className=' bg-gray-200 flex justify-center items-center flex-wrap '>
      {data.length ? (
        data?.map((post, index) => (
          <Bounce bottom>
            <div className='mb-5 xl:w-super_larg text-center xl:text-left xl:min-h-72  w-40 bg-blue-500  mt-24 mr-5 ml-5 rounded-md  flex flex-col xl:flex xl:flex-row  relative shadow-xl break-words'>
              <div className='mt-16 xl:ml-5 xl:w-text_width   flex justify-center flex-col break-words xl:break-words text-white '>
                <div className='h-52 xl:h-32 '>
                  <p className='text-xs  xl:text-lg mb-2 '>
                    Reporter ID: {post.reporterId}
                  </p>
                  <p className='text-xs xl:text-lg mb-5 '>
                    Report On ID: {post.reportOnId}
                  </p>

                  <p className='xl:mr-5 xl:ml-0  ml-5 mr-5  text-xs xl:text-base '>
                    {post.report}
                  </p>
                </div>

                <div className='xl:flex xl:flex-row mt-7 items-center  flex flex-col xl:ml-0 xl:mr-0 ml-1 mr-1 '>
                  <button
                    onClick={() => {
                      retrieveReport(index);
                    }}
                    className=' text-xs bg-green-600  rounded-sm px-7 py-0.5 h-5 xl:mr-5 mb-5 transform hover:scale-110 transition-all duration-300 ease-in-out'
                  >
                    Retrieve
                  </button>
                  <button
                    onClick={() => {
                      deleteReport(index);
                    }}
                    className=' text-xs bg-red-600  rounded-sm px-7 py-0.5 h-5 xl:mr-5 mb-5 transform hover:scale-110 transition-all duration-300 ease-in-out'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Bounce>
        ))
      ) : (
        <div className='flex flex-col justify-center items-center mt-32'>
          <img src={noData} alt='' className='w-52 h-52' />

          <h1 className='sm:text-md text-sm text-center'>
            There is No Trashed Reports
          </h1>
        </div>
      )}
      <Toaster position='top-center' />
    </div>
  );
};

export default ReportsTrash;
