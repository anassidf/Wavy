import { useState, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  updateDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  documentId,
  getDocs,
} from "firebase/firestore";
import { storage, auth, db } from "../firebaseConfig";
import { reviewFormValidation } from "./validations/reviewFormValidation";
const ReviewForm = (props) => {
  const { setIsReviewFormOpen, currentUserID, uid, setReviews } = props;
  const initialValues = {
    description: "",
  };
  const date = new Date();
  const todaysDate =
    date?.getFullYear() + "-" + (date?.getMonth() + 1) + "-" + date?.getDate();
  const handleSubmit = async (values) => {
    const reviewsCollectionRef = collection(db, "reviews");
    let reviewDocs = [];
    let reviewsID = [];
    await addDoc(reviewsCollectionRef, {
      description: values?.description,
      fromID: currentUserID,
      toID: uid,
      createdAt: todaysDate,
    });
    await getDocs(reviewsCollectionRef)?.then((resp) => {
      reviewDocs = resp.docs.filter((doc) => doc.data().toID === uid);
      reviewsID = reviewDocs.map((doc) => {
        return doc.id;
      });
    });
    await updateDoc(doc(db, "Users", uid), {
      reviewsID: reviewsID,
    });
    //setReviews(reviews);
    setIsReviewFormOpen(false);
  };

  return (
    <>
      <div className='flex justify-center items-center h-screen fixed top-0 left-0 w-full bg-gray-300'>
        <div className='shadow-2xl relative m-2 p-4 w-full max-w-2xl bg-white rounded-lg flex flex-col'>
          <div className='flex justify-between m-2 items-center '>
            <h1 className='text-base sm:text-xl'>
              Descripe Your Experience With This Tour Guide
            </h1>
            <ImCancelCircle
              className='cursor-pointer ml-1'
              size={20}
              onClick={() => setIsReviewFormOpen(false)}
            />
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={reviewFormValidation}
            onSubmit={handleSubmit}
          >
            <Form className='flex flex-col items-center'>
              <div className='flex flex-col'>
                <Field
                  placeholder='Write Here...'
                  name='description'
                  type='text'
                  as='textarea'
                  className='mx-2 my-3 h-40 sm:w-96 p-2 border-2 border-gray-500 outline-none'
                />
                <ErrorMessage
                  component='div'
                  name='description'
                  className='text-red-500 text-xs text-left mx-4 mb-2'
                />
              </div>
              <button
                type='submit'
                className='text-lg border border-black rounded-lg px-3 py-1 m-2'
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ReviewForm;
