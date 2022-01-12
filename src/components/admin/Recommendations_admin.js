import React from "react";
import { useState, useCallback } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { db, storage } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Fade from "react-reveal/Fade";
const Recommendations_admin = () => {
  const [file, setfile] = useState([]);

  /* ------------------------------ */

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

  /* create preview image */
  const thumbs = file.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} className='sm:w-26 sm:h-16 w-10 h-10' />
      </div>
    </div>
  ));

  /* ------------------------------ */

  const handleRecommendations = (values) => {
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

              addDoc(collection(db, "Recommendations"), {
                title: values.title,
                description: values.description,
                youtubeLink: values.youtubeLink,
                imageUrl: url,
              })
                .then(() => {
                  toast.success("Recommendation Slide Added Successfully");
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
    } else {
      if (values.title || values.description) {
        toast.error("Please add image for your post");
      } else {
        toast.error("Please fill all the fields");
      }
    }
  };

  return (
    <div className='bg-gray-200  flex-1 relative flex justify-center h-screen items-center mt-5'>
      <div className='bg-add_recommendations bg-center bg-cover min-h-screen absolute top-0 right-0 left-0 filter blur-sm'></div>

      <Formik
        initialValues={{
          title: "",
          description: "",
          youtubeLink: "",
        }}
        /* validationSchema={adminValidation} */
        onSubmit={handleRecommendations}
      >
        <Fade>
          <div className='z-10 bg-blue-200 flex  justify-center items-center min-h-super_larg_height2 w-additional_user_data2 2xl:w-additional_user_data1   rounded-lg shadow-lg bg-opacity-80 relative '>
            <Form className='flex flex-col items-center'>
              <h1 className='sm:text-2xl text-xs text-center font-bold mb-3 mt-5'>
                Add Recommendations Slide
              </h1>

              <div
                {...getRootProps()}
                className='cursor-pointer flex justify-center items-center border-2 border-dotted border-gray-500 mt-6 sm:py-2 sm:w-96 py-1.5 w-32 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm h-28 '
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
                  className='mt-6 sm:py-2 sm:w-96 py-1.5 w-32 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
                />
                <ErrorMessage
                  component='div'
                  name='username'
                  className='text-red-500 text-xs text-center sm:text-left mt-1 sm:ml-5  '
                />
              </div>
              <div className='relative text-center sm:text-left'>
                <Field
                  id='field2'
                  autoComplete='off'
                  name='youtubeLink'
                  placeholder='Video Link'
                  type='text'
                  className='mt-6 sm:py-2 sm:w-96 py-1.5 w-32 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
                />
                <ErrorMessage
                  component='div'
                  name='username'
                  className='text-red-500 text-xs text-center sm:text-left mt-1 sm:ml-5  '
                />
              </div>
              <div className='relative text-center sm:text-left'>
                <Field
                  placeholder='Description'
                  as='textarea'
                  id='field3'
                  autoComplete='off'
                  rows='5'
                  name='description'
                  className='mt-6 sm:py-2 sm:w-96 py-1.5 w-32 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
                />
                <ErrorMessage
                  component='div'
                  name='password'
                  className='text-red-500 text-xs text-center sm:text-left mt-1 sm:ml-5  '
                />
              </div>

              <button className='mt-6 mb-5 bg-purple-800 text-white rounded-md sm:py-2 sm:w-96 py-1.5 w-32  hover:shadow-xl font-bold shadow-md transition-all ease-in-out duration-300 hover:bg-opacity-80 sm:text-lg text-sm'>
                Add
              </button>
            </Form>
          </div>
        </Fade>
      </Formik>
      <Toaster position='top-center' />
    </div>
  );
};

export default Recommendations_admin;
