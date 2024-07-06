import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { LoginUser } from "../../Redux/apiRequest";
import toast, { Toaster } from "react-hot-toast";
import { Loading } from "../../Components/LoadingPage/LoadingPage";

interface FormValues {
  username: string;
  password: string;
}

const formFields = [
  {
    type: "text",
    name: "username",
    placeholder: "Username",
    className: "p-2 w-full border border-gray-300 mt-2 rounded-md mb-2",
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password",
    className: "p-2 w-full border border-gray-300 mt-2 rounded-md",
  },
];

export const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormValues = {
    username: "",
    password: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setIsLoading(true);
    try {
      const newUser = {
        username: values.username,
        password: values.password,
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        grant_type: "password",
      };

      await LoginUser(newUser, dispatch, navigate);
      setSubmitting(false);
    } catch (error) {
      console.log("Login failed");
      toast.error("Please check your username or password");
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <Toaster position="top-right" reverseOrder={true} />
      {isLoading && <Loading />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full md:w-[420px] bg-white md:block  p-6 rounded-md shadow-md">
          <h1 className="font-bold text-[30px] text-center uppercase mb-4">
            Welcome back
          </h1>
          {formFields.map((field) => (
            <React.Fragment key={field.name}>
              <Field {...field} />
              <ErrorMessage
                name={field.name}
                component="div"
                className="text-red-500 text-left mt-1"
              />
            </React.Fragment>
          ))}
          <div className="text-right mt-2">
            <Link to="/rest-password" className="text-blue-500">
              Reset Password
            </Link>
          </div>
          <button
            type="submit"
            className={`w-full text-white bg-black p-3 rounded-md mt-4 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            Sign in
          </button>
          <p className="flex justify-center items-center gap-2 text-sm mt-4">
            Don't have an account?
            <button
              type="button"
              className="text-blue-500"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </p>
        </Form>
      </Formik>
    </div>
  );
};
