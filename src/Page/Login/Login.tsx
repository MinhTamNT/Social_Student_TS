import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface FormValues {
  username: string;
  password: string;
}

export const Login = () => {
  const initialValues: FormValues = {
    username: "",
    password: "",
  };

  const navigate = useNavigate();

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);
    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="w-full md:w-[450px] md:h-[350px] md:shadow-md flex flex-col justify-center items-center md:flex-col h-full">
            <h1 className="font-bold text-[30px] text-center uppercase">
              Welcome back
            </h1>
            <Field
              type="text"
              name="username"
              placeholder="Username"
              className="p-2 w-[300px] border-[1px] mt-2 rounded-md mb-2"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-left"
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="p-2 w-[300px] border-[1px] mt-2 rounded-md"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
            <button
              type="submit"
              className="w-full md:w-[300px] text-white bg-black p-3 rounded-md mt-2"
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
    </div>
  );
};
