const Blog = require("../model/BlogModel");
const Register = require("../model/RegisterModel");
exports.getBlogs = async (req, res) => {
  const id = req.params.id;
  console.log(id, "id");
  try {
    const blogs = await Blog.find({ register: id });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, image, description } = req.body;
    const id = req.params.id;
    if (!description || !title || !image) {
      return res
        .status(400)
        .json({ error: " title, and content are required" });
    }

    const register = await Register.findById(id);
    console.log(register, "register");
    if (!register) {
      return res.status(404).json({ error: "Register not found" });
    }

    const blog = new Blog({
      register: register._id,
      title,
      image,
      description,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create blog", details: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "idaSDFGHJKL");
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(updatedBlog, "updateBlog");
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update blog", details: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};
