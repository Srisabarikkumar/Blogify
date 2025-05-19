import { Blog } from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js"

export const getAllBlogs = async (req, res) => {
  try {
    const { category, author } = req.query;

    if (category || author) {
      const match = {};
      if (category) match.category = category;
      if (author) match.author = author;

      const blogs = await Blog.aggregate([
        { $match: match },
        { $sort: { createdAt: -1 } },
        { $project: { title: 1, author: 1, category: 1, createdAt: -1 } }
      ]);

      return res.status(200).json(blogs);
    }

    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(201).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    let { image } = req.body; 
    const userId = req.user._id.toString();

    if (!title || !category || !content) {
      return res
        .status(400)
        .json({ error: "Blog must have all the required fields" });
    }

    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      image = uploadedResponse.secure_url;
    }

    const newBlog = new Blog({
      userId,
      title,
      category,
      content,
      image,
      author: req.user.name
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBlogById = async (req, res) => {
  try {
    const { title, category, content, image } = req.body;
    const { id } = req.params;


    const updateData = { title, category, content, image };

    const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    if (!blog) {
        return res.status(400).json({ error: "Blog not found" });
    }

    res.status(201).json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
  
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(400).json({ error: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getMyBlogs = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const blogs = await Blog.find({ userId }).sort({ createdAt: -1 }).populate({
      path: "userId",
      select: "-password"
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);

        res.status(201).json({ message: "Song deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
