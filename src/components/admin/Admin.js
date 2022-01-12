import { Formik, Form, ErrorMessage, Field } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { adminValidation } from "../validations/adminValidation";
import { useHistory } from "react-router-dom";
const Admin = () => {
  const history = useHistory();
  const handleAdminData = (values) => {
    if (values.username === "admin" && values.password === "admin") {
      history.push("/admin/dashboard");
    } else {
      toast.error("Wrong username or password");
    }

    document.getElementById("field1").value = "";
    document.getElementById("field2").value = "";
    document.getElementById("field3").value = "";
    document.getElementById("field4").value = "";
  };

  return (
    <div className='h-screen flex justify-center items-center '>
      <div className='bg-admin_Image bg-center bg-cover  h-screen absolute top-0 right-0 left-0 filter blur-sm'></div>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={adminValidation}
        onSubmit={handleAdminData}
      >
        <div className='z-10 bg-blue-200 mt-10 flex  justify-center items-center h-super_larg_height2 w-additional_user_data2 lg:w-additional_user_data1   rounded-lg shadow-lg bg-opacity-80 relative '>
          <Form className='flex flex-col items-center'>
            <h1 className='lg:text-3xl font-bold mb-14 text-sm'>
              Welcome Boss
            </h1>
            <div className='relative text-center sm:text-left'>
              <Field
                id='field1'
                autoComplete='off'
                name='username'
                placeholder='Username'
                type='text'
                className='mt-6 sm:py-2 sm:w-96 py-1.5 w-40 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
              />
              <ErrorMessage
                component='div'
                name='username'
                className='text-red-500 text-xs text-center sm:text-left mt-1 sm:ml-5  '
              />
            </div>
            <div className='relative text-center sm:text-left'>
              <Field
                placeholder='Password'
                id='field2'
                autoComplete='off'
                type='password'
                name='password'
                className='mt-6 sm:py-2 sm:w-96 py-1.5 w-40 rounded-lg shadow-md placeholder-gray-400 px-6 outline-none  tracking-widest sm:text-lg text-sm '
              />
              <ErrorMessage
                component='div'
                name='password'
                className='text-red-500 text-xs text-center sm:text-left mt-1 sm:ml-5  '
              />
            </div>

            <button className='mt-6 mb-5 bg-purple-800 text-white rounded-md sm:py-2 sm:w-96 py-1.5 w-40  hover:shadow-xl font-bold shadow-md transition-all ease-in-out duration-300 hover:bg-opacity-80 sm:text-lg text-sm'>
              Enter
            </button>
          </Form>
        </div>
      </Formik>
      <Toaster position='top-center' />
    </div>
  );
};

export default Admin;
