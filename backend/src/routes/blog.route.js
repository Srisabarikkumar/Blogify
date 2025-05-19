import express from "express";
import {
  createBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getMyBlogs,
  updateBlogById,
} from "../controllers/blog.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getAllBlogs);
router.post("/", singleUpload, createBlog);
router.get("/myblogs", getMyBlogs);
router.get("/:id", getBlogById);
router.put("/:id", updateBlogById);
router.delete("/:id", deleteBlogById);

export default router;
