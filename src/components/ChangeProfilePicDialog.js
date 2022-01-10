import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImCancelCircle } from "react-icons/im";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { storage, auth, db } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast, Toaster } from "react-hot-toast";

const ChangeProfilePicDialog = (props) => {
  const { setIsChangeProfilePicOpen, setProfilePicture } = props;
  const [userDoc, setUserDoc] = useState({});
  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    if (file.length) {
      setIsLoading(true);
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
              setProfilePicture(url);
              updateDoc(userDoc, {
                photo: url,
              });
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
      );

      setTimeout(() => {
        setIsLoading(false);
        setIsChangeProfilePicOpen(false);
      }, 3000);
    } else {
      toast.error("Please add image for your post");
    }
  };
  const onDrop = useCallback((acceptedFile) => {
    // Do something with the files
    console.log(acceptedFile);
    setFile(
      acceptedFile.map((file) =>
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
  const thumbs = file.map((file, index) => (
    <div key={index} className='self-center'>
      <img src={file.preview} className='w-44 h-60 object-contain' />
    </div>
  ));
  useEffect(() => {
    setUserDoc(doc(db, "Users", auth.currentUser.uid));
    return () => {};
  }, []);
  return (
    <>
      <div className='flex justify-center items-center h-screen fixed top-0 left-0 w-full bg-gray-300'>
        {isLoading ? (
          <div className='w-full h-screen flex justify-center items-center'>
            <h1 className='text-2xl'>Loading...</h1>
          </div>
        ) : (
          <div className='shadow-2xl relative m-2 p-4 w-full max-w-2xl bg-white rounded-lg flex flex-col'>
            <div className='flex justify-between m-2 items-center '>
              <h1 className='text-base sm:text-xl'>
                Change Your Profile Picture
              </h1>
              <ImCancelCircle
                className='cursor-pointer ml-1'
                size={20}
                onClick={() => setIsChangeProfilePicOpen(false)}
              />
            </div>
            <div
              {...getRootProps()}
              className='self-center cursor-pointer flex justify-center items-center p-4 mx-2 my-3 h-24 sm:w-72 md:w-96 sm:h-28 border-2 border-dotted border-gray-500 rounded-lg shadow-md placeholder-gray-400 outline-none  tracking-widest sm:text-lg text-sm '
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
              {/* <aside>{thumbs}</aside> */}
            </div>
            {/* <img src={image} alt="Old Image!" className="w-36 h-44" /> */}
            {file.length > 0 && thumbs}
            <button
              type='submit'
              onClick={handleSubmit}
              className='text-lg border border-black rounded-lg px-3 py-1 w-44 self-end mx-4 mt-4'
            >
              Submit
            </button>
          </div>
        )}

        <Toaster position='bottom-center' />
      </div>
    </>
  );
};

export default ChangeProfilePicDialog;
