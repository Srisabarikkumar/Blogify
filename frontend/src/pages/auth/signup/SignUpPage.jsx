import { Link } from "react-router-dom";
import signupImg from "../../../assets/Mobile login-pana.svg";
import { MdFrontLoader, MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../../store/useAuthStore";

const SignUpPage = () => {
  const { isSigningUp, signup } = useAuthStore();

  const SignUpSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be atleast 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 lg:flex hidden items-center justify-center">
        <img src={signupImg} alt="signup" className="lg:h-2/3" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values, { setSubmitting }) => {
            signup(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, getFieldProps }) => (
            <Form className="lg:w-2/3 md:w-auto mx-auto md:mx-20 flex gap-4 flex-col">
              <img src={signupImg} alt="signup" className="h-24 lg:hidden" />
              <h1 className="text-4xl font-extrabold">Sign up</h1>
              <label className="input input-bordered rounded flex items-center gap-2">
                <FaUser />
                <input
                  type="text"
                  className="grow"
                  placeholder="Name"
                  {...getFieldProps("name")}
                />
              </label>
                {errors.name && touched.name ? (
                  <div className="text-red-500">{errors.name}</div>
                ) : null}
              <div className="flex gap-4 flex-wrap">
                <label className="input input-bordered rounded flex items-center gap-2 flex-1">
                  <MdOutlineMail />
                  <input
                    type="email"
                    className="grow"
                    placeholder="Email"
                    {...getFieldProps("email")}
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-500">{errors.email}</div>
                  ) : null}
                </label>
                <label className="input input-bordered rounded flex items-center gap-2 flex-1">
                  <MdPassword />
                  <input
                    type="password"
                    className="grow"
                    placeholder="Password"
                    {...getFieldProps("password")}
                  />
                  {errors.password && touched.password ? (
                    <div className="text-red-500">{errors.password}</div>
                  ) : null}
                </label>
              </div>
              <button
                type="submit"
                className="btn rounded-full btn-primary"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <MdFrontLoader className="size-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className=" text-lg">Already have an account?</p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
