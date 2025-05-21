import { useEffect } from "react";
import useBlogStore from "../../../store/useBlogStore";
import ReadOnlyBlog from "../home/components/ReadOnlyBlog";
import { Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import createBlogImg from "../../../assets/Design thinking-pana.svg";
import MyBlogCard from "./components/MyBlogCard";
// import useAuthStore from "../../../store/useAuthStore";

const MyBlogs = () => {
  const { getMyBlogs, myBlogs } = useBlogStore();
  // const { authUser } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    getMyBlogs();
  }, [getMyBlogs]);

  const blogHandler = (blogId) => {
    navigate(`/my-blog/${blogId}`);
  };

  return (
    <div className="mt-5">
      {myBlogs.length === 0 ? (
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row py-20 px-10">
          <div className="flex-1 lg:flex gap-4 items-center justify-center">
            <img src={createBlogImg} className="max-h-96" alt="createBlog" />
          <div className="p-4">
            <p className="text-xl font-semibold py-4">
              U haven't created any blogs yet!.{" "}
            </p>
            <Link to="/create-blog">
              <button className="btn rounded-full btn-primary btn-outline">
                Create Blog
              </button>
            </Link>
          </div>
          </div>
        </div>
      ) : (
        <div className="p-6 max-w-4xl  mx-auto">
          <h1 className="text-3xl my-10 font-bold">My Blogs</h1>
          {myBlogs.map((blog) => (
            <MyBlogCard
              onClick={() => blogHandler(blog._id)}
              key={blog._id}
              blog={blog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
