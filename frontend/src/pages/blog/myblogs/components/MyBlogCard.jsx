import { Card, Avatar, Tag } from "antd";
import { BookOutlined } from "@ant-design/icons";

const MyBlogCard = ({ blog, onClick }) => {
  return (
    <Card onClick={onClick} className="mb-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
      <div className="flex justify-between mb-2">
        <div className="flex items-center mb-2">
        <Avatar className="bg-black text-white uppercase">
          {blog.author?.charAt(0)}
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-semibold">{blog.author}</p>
          <p className="text-xs text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            ({Math.floor((Date.now() - new Date(blog.createdAt)) / 3600000)} hours ago)
          </p>
        </div>
        </div>

       
      </div>

      <h2 className="text-lg font-bold mb-1">{blog.title}</h2>

      <div className="mb-2 flex flex-wrap gap-2">
        <Tag color="blue">{blog.category}</Tag>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
        </div>
        <div className="flex items-center gap-2">
          <BookOutlined />
          <span>3 min read</span>
        </div>
      </div>
    </Card>
  );
};

export default MyBlogCard;
