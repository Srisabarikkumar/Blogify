import { useEffect } from "react";
import useBlogStore from "../../../store/useBlogStore";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import ReadOnlyBlog from "./components/ReadOnlyBlog";
import {Flex, Tag} from "antd";
import blogImage from "../../../assets/Blog post-bro.svg";

const Blog = () => {
  const { blog, getBlogById } = useBlogStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getBlogById(id);
    }
  }, [getBlogById, id]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="p-6 my-6">
        <div key={blog?._id} className="mb-10 border-b space-y-6 pb-6">
          <img src={blog?.image || blogImage} className="w-full h-96 my-5" alt="blog-image" />
          <h1 className="text-3xl font-bold mb-2">{blog?.title}</h1>
          <div className="flex gap-4">
          <Tag color="magenta" className="text-sm text-gray-500 mb-3">
            Category: {blog?.category}
          </Tag>
          <Tag color="geekblue" className="text-sm text-gray-500 mb-3">
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

export default Blog;
