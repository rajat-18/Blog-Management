const express = require('express');
const blogController = require("../controller/blogController");
const router = express.Router();

router.post("/createblogs/:id", blogController.createBlog);
router.put("/updateblogs/:id", blogController.updateBlog);
router.get("/getblogs/:id", blogController.getBlogs);
router.delete("/blogs/:id", blogController.deleteBlog);

module.exports = router;



