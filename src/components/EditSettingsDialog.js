import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { auth, db } from "../firebaseConfig";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import {
  editFormTourGuideValidations,
  editFormNormalUserValidations,
} from "./validations/editSettingsFormValidations";
import { BiUser } from "react-icons/bi";
import { useEffect } from "react";
const EditSettingsDialog = (props) => {
  const {
    setIsEditFormOpened,
    fullName,
    setFullName,
    businessEmail,
    setBusinessEmail,
    phoneNumber,
    setPhoneNumber,
    dateOfBirth,
    setDateOfBirth,
    address,
    setAddress,
    info,
    setInfo,
    cityToGuideIn,
    setCityToGuideIn,
    isAvailable,
    setisAvailable,
    isTourGuide,
  } = props;
  const [nextStep, setNextStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userDoc, setUserDoc] = useState({});

  const initialValuesTourGuide = {
    fullName: `${fullName}`,
    dateOfBirth: `${dateOfBirth}`,
    address: `${address}`,
    status: `${isAvailable ? "Available" : "Reserved"}`,
    description: `${info}`,
    phoneNumber: `${phoneNumber}`,
    businessEmail: `${businessEmail}`,
    cityToGuideIn: `${cityToGuideIn}`,
  };
  const initialValuesNormalUser = {
    fullName: `${fullName}`,
    dateOfBirth: `${dateOfBirth}`,
    address: `${address}`,
    description: `${info}`,
    phoneNumber: `${phoneNumber}`,
    businessEmail: `${businessEmail}`,
  };
  const handleSubmit = async (values) => {
    const {
      address,
      dateOfBirth,
      description,
      businessEmail,
      fullName,
      phoneNumber,
      status,
      cityToGuideIn,
    } = values;

    setIsLoading(true);

    isTourGuide
      ? await updateDoc(userDoc, {
          businessEmail: businessEmail,
          address: address,
          description: description,
          dateOfBirth: dateOfBirth,
          fullName: fullName,
          phoneNumber: phoneNumber,
          status: status,
          cityToGuideIn: cityToGuideIn,
        })
      : await updateDoc(userDoc, {
          businessEmail: businessEmail,
          address: address,
          description: description,
          dateOfBirth: dateOfBirth,
          fullName: fullName,
          phoneNumber: phoneNumber,
        });
    setFullName(fullName);
    setBusinessEmail(businessEmail);
    setPhoneNumber(phoneNumber);
    setDateOfBirth(dateOfBirth);
    setAddress(address);
    setInfo(description);
    setCityToGuideIn(cityToGuideIn);
    status === "Available" ? setisAvailable(true) : setisAvailable(false);
    setIsLoading(false);
    setIsEditFormOpened(false);
  };
  useEffect(() => {
    setUserDoc(doc(db, "Users", auth.currentUser.uid));
    return () => {};
  }, []);

  return props.trigger ? (
    <div className='flex justify-center items-center h-screen fixed top-0 left-0 w-full bg-gray-300'>
      {isLoading ? (
        <div className='w-full h-screen flex justify-center items-center'>
          {Loading.circle()}
        </div>
      ) : (
        <div className='shadow-2xl relative m-2 p-4 w-full max-w-2xl bg-white rounded-lg flex flex-col'>
          {Loading.remove()}
          <div className='flex justify-between m-2 items-center '>
            <h1 className='text-xl '>Edit Information</h1>
            <ImCancelCircle
              className='cursor-pointer'
              size={20}
              onClick={() => setIsEditFormOpened(false)}
            />
          </div>
          <Formik
            initialValues={
              isTourGuide ? initialValuesTourGuide : initialValuesNormalUser
            }
            validationSchema={
              isTourGuide
                ? editFormTourGuideValidations
                : editFormNormalUserValidations
            }
            onSubmit={handleSubmit}
          >
            <Form className='flex flex-col items-center'>
              {!nextStep && (
                <div>
                  {/* TODO add icons to the field */}
                  <div className='flex flex-col sm:w-72 md:w-96'>
                    <Field
                      placeholder='Full Name'
                      name='fullName'
                      type='text'
                      className='mx-2 my-3 h-8 p-2 border-b-2 border-gray-500 outline-none'
                    />

                    <ErrorMessage
                      component='div'
                      name='fullName'
                      className='text-red-500 text-xs text-left mx-4'
                    />
                    <Field
                      placeholder='Business Email'
                      name='businessEmail'
                      type='email'
                      className='mx-2 my-3 h-8 p-2 border-b-2 border-gray-500 outline-none'
                    />
                    <ErrorMessage
                      component='div'
                      name='businessEmail'
                      className='text-red-500 text-xs text-left mx-4'
                    />
                    {isTourGuide && (
                      <>
                        <Field
                          as='select'
                          name='cityToGuideIn'
                          className='mx-2 my-3 h-8 border-b-2 border-gray-500 outline-none'
                        >
                          <option value='' defaultValue>
                            City To Guide In
                          </option>
                          <option value='Irbid'>Irbid</option>
                          <option value='Jerash'>Jerash</option>
                          <option value='Ajloun'>Ajloun</option>
                          <option value='Amman'>Amman</option>
                          <option value='Zarqa'>Zarqa</option>
                          <option value='Kerak'>Kerak</option>
                          <option value='Al-Tafelah'>Al-Tafelah</option>
                          <option value="Ma'an">Ma'an</option>
                          <option value='Aqaba'>Aqaba</option>
                          <option value='Al-Mafraq'>Al-Mafraq</option>
                          <option value='Madaba'>Madaba</option>
                          <option value='Balqa '>Balqa </option>
                        </Field>
                        <ErrorMessage
                          component='div'
                          name='cityToGuideIn'
                          className='text-red-500 text-xs text-left mx-4'
                        />
                      </>
                    )}

                    <Field
                      placeholder='Date of Birth'
                      name='dateOfBirth'
                      type='date'
                      className='mx-2 my-3 h-8 p-2 border-b-2 border-gray-500 outline-none'
                    />

                    <ErrorMessage
                      component='div'
                      name='dateOfBirth'
                      className='text-red-500 text-xs text-left mx-4'
                    />
                  </div>
                  <div className='flex flex-row-reverse'>
                    <button
                      onClick={() => setNextStep(true)}
                      className='text-lg m-2 border border-black rounded-lg px-3 py-1'
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {nextStep && (
                <div className='flex flex-col sm:w-72 md:w-96'>
                  {isTourGuide && (
                    <>
                      <Field
                        placeholder='Status'
                        name='status'
                        as='select'
                        className='mx-2 my-3 h-8 border-b-2 border-gray-500 outline-none'
                      >
                        <option value='' defaultValue>
                          Status
                        </option>
                        <option value='Available'>Available</option>
                        <option value='Reserved'>Reserved</option>
                      </Field>
                      <ErrorMessage
                        component='div'
                        name='status'
                        className='text-red-500 text-xs text-left mx-4'
                      />
                    </>
                  )}

                  <Field
                    name='address'
                    type='text'
                    placeholder='Address'
                    className='mx-2 my-3  h-8  border-b-2 border-gray-500 outline-none'
                  />

                  <ErrorMessage
                    component='div'
                    name='address'
                    className='text-red-500 text-xs text-left mx-4'
                  />
                  <Field
                    placeholder='07XXXXXXXX'
                    name='phoneNumber'
                    type='text'
                    className='mx-2 my-3 h-8 p-2 border-b-2 border-gray-500 outline-none'
                  />
                  <ErrorMessage
                    component='div'
                    name='phoneNumber'
                    className='text-red-500 text-xs text-left mx-4'
                  />
                  <Field
                    placeholder='About Me'
                    name='description'
                    type='text'
                    as='textarea'
                    className='mx-2 my-3 h-40 p-2 border-2 border-gray-500 outline-none'
                  />
                  <ErrorMessage
                    component='div'
                    name='description'
                    className='text-red-500 text-xs text-left mx-4 mb-2'
                  />

                  <div className='flex justify-between mx-2 my-1'>
                    <button
                      onClick={() => setNextStep(false)}
                      className='text-lg border border-black rounded-lg px-3 py-1'
                    >
                      Previous
                    </button>
                    <button
                      type='submit'
                      className='text-lg border border-black rounded-lg px-3 py-1'
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      )}
    </div>
  ) : (
    ""
  );
};

export default EditSettingsDialog;
