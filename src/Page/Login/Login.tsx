import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    className: "p-2 w-[300px] border-[1px] mt-2 rounded-md mb-2",
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password",
    className: "p-2 w-[300px] border-[1px] mt-2 rounded-md",
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
      console.log("Login fail");
      toast.error("Can you you check password or username")
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
    <div className="flex flex-col justify-center items-center h-screen">
      <Toaster position="top-right" reverseOrder={true} />
      {isLoading && <Loading />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full md:w-[450px] md:h-[350px] md:shadow-md flex flex-col justify-center items-center md:flex-col h-full">
          <h1 className="font-bold text-[30px] text-center uppercase">
            Welcome back
          </h1>
          {formFields.map((field) => (
            <React.Fragment key={field.name}>
              <Field {...field} />
              <ErrorMessage
                name={field.name}
                component="div"
                className="text-red-500 text-left"
              />
            </React.Fragment>
          ))}
          <button
            type="submit"
            className={`w-full md:w-[300px] text-white bg-black p-3 rounded-md mt-2 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            Sign in
          </button>
          <p className="flex justify-center items-center gap-2 text-14 mt-2 text-center">
            Don't have an account?
            <button
              type="button"
              className="text-blue-400"
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
