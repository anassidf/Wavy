import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Toaster, toast } from "react-hot-toast";
import wavyTeam from "../assets/blackNavbarIcon.svg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useParams, useHistory } from "react-router-dom";
import userFormValidation from "./validations/userFormValidation";
const UserAdditionDataForm = () => {
  const params = useParams();
  const history = useHistory();

  /* this is the methode that is responsible of taking the data and later on push it to the database */
  const handleAdditionalUserData = (values) => {
    console.log(values);
    console.log(params.uid);
    /* here i update the date based on the uid */
    const docRef = doc(db, "Users", params.uid);
    updateDoc(docRef, {
      description: values.brief,
      phoneNumber: values.phoneNumber,
      dateOfBirth: values.dateOfBirth,
      address: values.address,
      businessEmail: values.businessEmail,
    })
      .then(() => {
        /* redirect the user to his/her profile */
        toast.success("Your profile is updated");
        history.push(`/profile-page/${params.uid}`);
      })
      .catch(() => {
        toast.error("something went wrong");
      });

    document.getElementById("field1").value = "";
    document.getElementById("field2").value = "";
    document.getElementById("field3").value = "";
    document.getElementById("field4").value = "";
    document.getElementById("field5").value = "";
  };

  useEffect(() => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className='flex-1 w-0 p-4'>
          <div className='flex items-start'>
            <div className='flex-shrink-0 pt-0.5'>
              <img className='h-10 w-10 rounded-full' src={wavyTeam} alt='' />
            </div>
            <div className='ml-3 flex-1'>
              <p className='text-sm font-medium text-gray-900'>Wavy Team</p>
              <p className='mt-1 text-sm text-gray-500'>
                Please fill the form to complete your profile
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
  }, []);

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-additional_user_data_image bg-center bg-cover  h-screen absolute top-0 right-0 left-0'></div>
      <Formik
        initialValues={{
          phoneNumber: "",
          dateOfBirth: "",
          address: "",
          brief: "",
          businessEmail: "",

          /* brief: '', */
        }}
        validationSchema={userFormValidation}
        onSubmit={handleAdditionalUserData}
      >
        <div className='z-10 bg-blue-200 flex  justify-center items-center h-super_larg_height2 w-additional_user_data2 lg:w-additional_user_data1   rounded-lg shadow-lg bg-opacity-80 relative '>
          <Form className='flex flex-col items-center'>
            <div className='relative text-center sm:text-left'>
              <Field
                id='field1'
                autoComplete='off'
                name='phoneNumber'
                placeholder='Phone Number'
                type='text'
                className='mt-6 sm:py-2 sm:w-96 py-1.5 w-52 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
              />
              <ErrorMessage
                component='div'
                name='phoneNumber'
                className='text-red-500 text-xs text-center sm:text-left mt-1 sm:ml-5  '
              />
            </div>
            <div className='relative text-center sm:text-left'>
              <Field
                id='field2'
                autoComplete='off'
                type='date'
                name='dateOfBirth'
                className='mt-6 sm:py-2 sm:w-96 py-1.5 w-52 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
              />
              <ErrorMessage
                component='div'
                name='dateOfBirth'
                className='text-red-500 text-xs text-center sm:text-left mt-1 sm:ml-5  '
              />
            </div>
            <div className='relative text-center sm:text-left'>
              <Field
                id='field3'
                autoComplete='off'
                placeholder='Address'
                name='address'
                type='text'
                className='mt-6 sm:py-2 sm:w-96 py-1.5 w-52 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
              />
              <ErrorMessage
                component='div'
                name='address'
                className='text-red-500 text-xs text-center sm:text-left mt-1 sm:ml-5  '
              />
            </div>
            <div className='relative text-center sm:text-left'>
              <Field
                id='field4'
                autoComplete='off'
                placeholder='Business Email'
                name='businessEmail'
                type='email'
                className='mt-6 sm:py-2 sm:w-96 py-1.5 w-52 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
              />
              <ErrorMessage
                component='div'
                name='businessEmail'
                className='text-red-500 text-xs text-center sm:text-left mt-1 sm:ml-5  '
              />
            </div>
            <div className='relative text-center sm:text-left'>
              <Field
                id='field5'
                autoComplete='off'
                as='textarea'
                rows='7'
                name='brief'
                placeholder='Brief'
                type=''
                className='mt-6 sm:py-2 sm:w-96 py-1.5 w-52 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
              />
              <ErrorMessage
                component='div'
                name='brief'
                className='text-red-500 text-xs text-center sm:text-left mt-2 sm:ml-5  '
              />
            </div>
            <button className='mt-6 mb-5 bg-purple-800 text-white rounded-md sm:py-2 sm:w-96 py-1.5 w-52  hover:shadow-xl font-bold shadow-md transition-all ease-in-out duration-300 hover:bg-opacity-80 sm:text-lg text-sm'>
              Add
            </button>
          </Form>
        </div>
      </Formik>
      <Toaster position='top-right' />
    </div>
  );
};

export default UserAdditionDataForm;
