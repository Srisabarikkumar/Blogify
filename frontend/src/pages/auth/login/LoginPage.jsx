import { MdOutlineMail, MdPassword } from "react-icons/md";
import loginImg from "../../../assets/Mobile login-cuate.svg";
import { Link } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { FiLoader } from "react-icons/fi";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
  const { isLoggingIn, login } = useAuthStore();

  const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be atleast 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 lg:flex hidden items-center justify-center">
        <img src={loginImg} alt="login" className="lg:h-2/3" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            login(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, getFieldProps }) => (
            <Form className="lg:w-2/3 md:w-auto mx-auto md:mx-20 flex gap-4 flex-col">
              {/* <XSvg className="w-24 lg:hidden fill-white" /> */}
              <img src={loginImg} alt="login" className="h-24 lg:hidden" />
              <h1 className="text-4xl font-extrabold">Sign in</h1>
              {/* <label className="input input-bordered rounded flex items-center gap-2">
            <FaUser />
            <input
              type="text"
              className="grow"
              placeholder="Name"
              name="name"
            />
          </label> */}
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
                {/* <label className="input input-bordered rounded flex items-center gap-2 flex-1">
                  <MdDriveFileRenameOutline />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Full Name"
                    name="fullName"
                  />
                </label> */}
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
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <FiLoader className="size-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Login"
                )}
              </button>
              {/* {isError && <p className="text-red-500">{error.message}</p>} */}
            </Form>
          )}
        </Formik>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className=" text-lg">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="btn rounded-full btn-primary btn-outline w-full">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
