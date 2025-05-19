import { useEffect } from "react";
import useBlogStore from "../../../store/useBlogStore";
import { useNavigate, useParams } from "react-router-dom";
import ReadOnlyBlog from "../home/components/ReadOnlyBlog";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import myBlogImage from "../../../assets/My answer-bro.svg";
import { Tag } from "antd";

const MyBlog = () => {
  const { blog, getBlogById, deleteBlogById } = useBlogStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBlogById(id);
    }
  }, [getBlogById, id]);

  const deleteBlogHandler = (blogId) => {
    deleteBlogById(blogId);
    navigate("/my-blogs");
  }

  return (
    <div className="my-12 mx-auto max-w-4xl">
      <div className="p-6">
        <div key={blog?._id} className="mb-10 border-b pb-6">
            <div className="flex gap-2">
            <button onClick={() => navigate(`/edit-blog/${blog?._id}`)} className="hover:bg-gray-300 p-2 rounded-md">
              <FaEdit className="size-5" />
            </button>
            <button onClick={() => deleteBlogHandler(blog?._id)} className="hover:bg-gray-300 p-2 rounded-md">
              <MdDelete className="size-5" />
            </button>
        </div>
        <img src={blog?.image || myBlogImage} className="w-full h-96 my-5" alt="myblog-image" />
          <h1 className="text-3xl font-bold mb-2">{blog?.title}</h1>
          <div className="flex gap-4">
          <Tag color="magenta" className="text-lg text-gray-500 mb-3">
            Category: {blog?.category}
          </Tag>
          <Tag color="geekblue" className="text-lg text-gray-500 mb-3">
            Author: {blog?.author}
          </Tag>
          </div>
          <div className="tiptap prose max-w-none">
            <ReadOnlyBlog content={blog?.content} />
          </div>
        </div>

         
      </div>
    </div>
  );
};

export default MyBlog;
