import React, { useState, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { db, auth, storage } from "../firebaseConfig";
import Fade from "react-reveal/Fade";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useHistory } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { shareFormValidation } from "./validations/shareFormValidation";
const ShareForm = () => {
  const history = useHistory();
  const [file, setfile] = useState([]);
  const currentUserID = auth.currentUser ? auth.currentUser.uid : "guest";
  /* using drop zone  */
  const onDrop = useCallback((acceptedfile) => {
    // Do something with the file

    setfile(
      acceptedfile.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxfile: 1,
    accept: "image/jpeg, image/png , image/svg",
  });

  /* handle share form */

  const handleShareForm = (values) => {
    /* get url for our image to make it public using firebase/storage */
    if (file.length) {
      const storageRef = ref(storage, `images/${file[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, file[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error.message);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              /* create a document for a new post  */
              addDoc(collection(db, "Posts"), {
                title: values.title,
                description: values.description,
                imageUrl: url,
                createdAt: todaysDate,
                likes: 0,
                uid: currentUserID,
                status: "under review",
                trashed: false,
              })
                .then(() => {
                  toast.success("Post is under review now ");
                  setTimeout(() => {
                    history.push("/");
                  }, 2000);
                })
                .catch((error) => {
                  console.log(error.message);
                });
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
      );

      /* getting the current date */

      const date = new Date();
      const todaysDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

      console.log(todaysDate);
    } else {
      if (values.title || values.description) {
        toast.error("Please add image for your post");
      } else {
        toast.error("Please fill all the fields");
      }
    }
  };

  /* create preview image */
  const thumbs = file.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} className='w-26 h-16' />
      </div>
    </div>
  ));

  /* save image to firebase storage  */

  return (
    <div className='bg-gray-300 h-screen flex justify-center items-center'>
      <div className='bg-shareBackground bg-center bg-cover  h-screen absolute top-0 right-0 left-0 filter blur-md '></div>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        validationSchema={shareFormValidation}
        onSubmit={handleShareForm}
      >
        <Fade>
          <div className='z-10 bg-blue-200 flex  justify-center items-center h-super_larg_height2 w-additional_user_data2 lg:w-additional_user_data1   rounded-lg shadow-lg bg-opacity-80 relative '>
            <Form className='flex flex-col items-center'>
              {/* image drop zone box */}
              <div
                {...getRootProps()}
                className='cursor-pointer flex justify-center items-center border-2 border-dotted border-gray-500 mt-6 sm:py-2 sm:w-96 py-1.5 w-52 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm h-28 '
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className='text-sm text-center animate-pulse text-green-400'>
                    Drop the Image here ...
                  </p>
                ) : (
                  <p className='text-xs text-center text-blue-500'>
                    Drag and drop any Image here, or click to select Image
                  </p>
                )}
                <aside>{thumbs}</aside>
              </div>

              <div className='relative text-center sm:text-left'>
                <Field
                  id='field1'
                  autoComplete='off'
                  name='title'
                  placeholder='Title'
                  type='text'
                  className='mt-6 sm:py-2 sm:w-96 py-1.5 w-52 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
                />
                <ErrorMessage
                  component='div'
                  name='title'
                  className='text-red-500 text-xs text-center sm:text-left mt-1 sm:ml-5  '
                />
              </div>

              <div className='relative text-center sm:text-left'>
                <Field
                  id='field2'
                  autoComplete='off'
                  as='textarea'
                  rows='7'
                  name='description'
                  placeholder='Describe your experience'
                  className='mt-6 sm:py-2 sm:w-96 py-1.5 w-52 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
                />
                <ErrorMessage
                  component='div'
                  name='description'
                  className='text-red-500 text-xs text-center sm:text-left mt-2 sm:ml-5  '
                />
              </div>
              <button className='mt-6 mb-5 bg-purple-800 text-white rounded-md sm:py-2 sm:w-96 py-1.5 w-52  hover:shadow-xl font-bold shadow-md transition-all ease-in-out duration-300 hover:bg-opacity-80 sm:text-lg text-sm'>
                Share
              </button>
            </Form>
          </div>
        </Fade>
      </Formik>
      <Toaster position='top-center' />
    </div>
  );
};

export default ShareForm;
