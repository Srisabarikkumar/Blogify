import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/useAuthStore";
import Blogs from "./pages/blog/home/Blogs";
import { useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import CreateBlog from "./pages/blog/createblog/CreateBlog";
import MyBlogs from "./pages/blog/myblogs/MyBlogs";
import Blog from "./pages/blog/home/Blog";
import EditBlog from "./pages/blog/editblog/EditBlog";
import EditMyBlog from "./pages/blog/myblogs/MyBlog";
import Layout from "./components/Layout";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FiLoader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-violet-50 overflow-auto h-screen">
      <Toaster />
      <Routes>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/create-blog" element={authUser ? <CreateBlog /> : <Navigate to="/login" />} />
        <Route path="/edit-blog/:id" element={authUser ? <EditBlog /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={authUser ? <Blogs /> : <Navigate to="/login" />} />
          <Route path="/my-blogs" element={authUser ? <MyBlogs /> : <Navigate to="/login" />} />
          <Route path="/blog/:id" element={authUser ? <Blog /> : <Navigate to="/login" />} />
          <Route path="/my-blog/:id" element={authUser ? <EditMyBlog /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
