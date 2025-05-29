const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  register: String,
  title: String,
  image: String,
  description: String,
});

const Blog = mongoose.model("Blog ", blogSchema);

module.exports = Blog;
