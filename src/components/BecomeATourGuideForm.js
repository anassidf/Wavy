import { useState, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { storage, auth, db } from "../firebaseConfig";
import { becomeATourGuideValidation } from "./validations/becomeATourGuideValidation";

const BecomeATourGuideForm = (props) => {
  const {
    setIsBecomeATourGuideFormOpened,
    cityToGuideIn,
    setCityToGuideIn,
    setIsTourGuide,
  } = props;
  const [userDoc, setUserDoc] = useState({});
  const initialValues = { city: cityToGuideIn };
  const handleSubmit = async (values) => {
    await updateDoc(userDoc, {
      cityToGuideIn: values.city,
      isTourGuideAccepted: "waiting",
      trashed: false,
    });
    setCityToGuideIn(values.city);
    setIsTourGuide(true);
    setIsBecomeATourGuideFormOpened(false);
  };
  useEffect(() => {
    setUserDoc(doc(db, "Users", auth.currentUser.uid));
    //fetchUserInfo();
  }, []);
  return (
    <>
      <div className='flex justify-center items-center h-screen fixed top-0 left-0 w-full bg-gray-300'>
        <div className='shadow-2xl relative m-2 p-4 w-full max-w-2xl bg-white rounded-lg flex flex-col'>
          <div className='flex justify-between m-2 items-center '>
            <h1 className='text-base sm:text-xl'>
              In which city do you want to guide tourists?
            </h1>
            <ImCancelCircle
              className='cursor-pointer ml-1'
              size={20}
              onClick={() => setIsBecomeATourGuideFormOpened(false)}
            />
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={becomeATourGuideValidation}
            onSubmit={handleSubmit}
          >
            <Form className='flex flex-col items-center'>
              <div className='flex flex-col'>
                <Field
                  as='select'
                  name='city'
                  className='mx-2 my-3 w-full sm:w-64 h-8  border-b-2 border-gray-500'
                >
                  <option value='' defaultValue>
                    City
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
                  name='city'
                  className='text-red-500 text-xs text-left mx-4'
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

export default BecomeATourGuideForm;
