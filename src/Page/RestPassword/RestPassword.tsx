import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { API, endpoints } from "../../Service/ApiConfig";

interface EmailFormValues {
  email: string;
}

interface ResetFormValues {
  code: string;
  email: string;
  newPassword: string;
}

const emailValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const resetValidationSchema = Yup.object({
  code: Yup.string().required("Reset code is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  newPassword: Yup.string().required("New password is required"),
});

export const RestPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleEmailSubmit = async (
    values: EmailFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const send = {
        email: values.email,
      };
      await API.post(endpoints["rest-password-send-mail"], send);
      toast.success("Reset code sent to your email");
      setStep(2);
    } catch (error) {
      toast.error("Failed to send reset code");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetSubmit = async (
    values: ResetFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const newPassword = {
        email: values.email,
        code: values.code,
        new_password: values.newPassword,
      };
      await API.post(endpoints["rest-password"], newPassword);
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to reset password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={true} />
      {step === 1 && (
        <Formik
          initialValues={{ email: "" }}
          validationSchema={emailValidationSchema}
          onSubmit={handleEmailSubmit}
        >
          <Form className="w-full md:w-[450px] bg-white p-6 rounded-md shadow-md">
            <h1 className="font-bold text-[30px] text-center uppercase mb-4">
              Reset Password
            </h1>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email"
              className="p-2 w-full border border-gray-300 mt-2 rounded-md mb-2"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-left mt-1"
            />
            <button
              type="submit"
              className="w-full text-white bg-black p-3 rounded-md mt-4"
            >
              Send Reset Code
            </button>
          </Form>
        </Formik>
      )}
      {step === 2 && (
        <Formik
          initialValues={{ code: "", email: "", newPassword: "" }}
          validationSchema={resetValidationSchema}
          onSubmit={handleResetSubmit}
        >
          <Form className="w-full md:w-[450px] bg-white p-6 rounded-md shadow-md">
            <h1 className="font-bold text-[30px] text-center uppercase mb-4">
              Enter Reset Code
            </h1>
            <Field
              type="text"
              name="email"
              placeholder="Enter email"
              className="p-2 w-full border border-gray-300 mt-2 rounded-md mb-2"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-left mt-1"
            />
            <Field
              type="text"
              name="code"
              placeholder="Reset Code"
              className="p-2 w-full border border-gray-300 mt-2 rounded-md mb-2"
            />
            <ErrorMessage
              name="code"
              component="div"
              className="text-red-500 text-left mt-1"
            />
            <Field
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="p-2 w-full border border-gray-300 mt-2 rounded-md mb-2"
            />
            <ErrorMessage
              name="newPassword"
              component="div"
              className="text-red-500 text-left mt-1"
            />
            <button
              type="submit"
              className="w-full text-white bg-black p-3 rounded-md mt-4"
            >
              Reset Password
            </button>
          </Form>
        </Formik>
      )}
    </div>
  );
};
