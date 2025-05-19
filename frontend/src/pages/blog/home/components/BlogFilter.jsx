import { Select, Space } from "antd";
import { useState, useEffect } from "react";

const { Option } = Select;

const BlogFilter = ({ blogs, getBlogs }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");

  const uniqueCategories = [...new Set(blogs.map((blog) => blog.category))];
  const uniqueAuthors = [...new Set(blogs.map((blog) => blog.author))];

  useEffect(() => {
    getBlogs({
      category: selectedCategory,
      author: selectedAuthor,
    });
  }, [selectedCategory, selectedAuthor, getBlogs]);

  return (
    <div className="flex max-w-4xl mx-auto flex-col md:flex-row justify-start items-center gap-4 my-16">
      <Space direction="horizontal">
        <label className="font-semibold">Category:</label>
        <Select
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          style={{ width: 160 }}
        >
          <Option value="all">All</Option>
          {uniqueCategories.map((cat) => (
            <Option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Option>
          ))}
        </Select>
      </Space>

      <Space direction="horizontal">
        <label className="font-semibold">Author:</label>
        <Select
          value={selectedAuthor}
          onChange={(value) => setSelectedAuthor(value)}
          style={{ width: 160 }}
        >
          <Option value="all">All</Option>
          {uniqueAuthors.map((author) => (
            <Option key={author} value={author}>
              {author}
            </Option>
          ))}
        </Select>
      </Space>
    </div>
  );
};

export default BlogFilter;
