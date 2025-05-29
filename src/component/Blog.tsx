import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { BASE_URL } from "../constant/constant";
interface Blog {
  _id: string;
  title: string;
  image: string;
  description: string;
}

const BlogApp: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [formData, setFormData] = useState<Omit<Blog, "_id">>({
    title: "",
    image: "",
    description: "",
  });
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const id = localStorage.getItem("id");
      const response = await axios.get<Blog[]>(
        `${BASE_URL}/api/v1/getblogs/${id}`
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        console.log(editingBlog._id, "fghjk");
        await axios.put(
          `${BASE_URL}/api/v1/updateblogs/${editingBlog._id}`,
          formData
        );
        setEditingBlog(null);
      } else {
        const id = localStorage.getItem("id");
        console.log(id, "id");
        const response = await axios.post(
          `${BASE_URL}/api/v1/createblogs/${id}`,
          formData
        );
        console.log(response, "response");
      }
      fetchBlogs();
      setFormData({ title: "", image: "", description: "" });
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      image: blog.image,
      description: blog.description,
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`${BASE_URL}/api/v1/blogs/${id}`);
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleView = (blog: Blog) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-5">
        <h2 className="text-xl font-bold mb-5 uppercase">
          {editingBlog ? "Edit Blog" : "Create Blog"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mb-5 bg-gray-100 p-5 rounded-lg"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Blog Title"
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Blog Description"
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            required
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded-sm">
            {editingBlog ? "Update Blog" : "Add Blog"}
          </button>
        </form>

        <h2 className="text-xl font-bold mb-5 uppercase">Blog List</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border">
                <td className="border p-2">{blog.title}</td>
                <td className="border p-2">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border p-2">{blog.description}</td>
                <td className="border p-2 space-x-2 space-y-2">
                  <button
                    onClick={() => handleView(blog)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && editingBlog && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 ">
            <div className="bg-white p-5 rounded-lg max-w-md">
              <h2 className="text-xl font-bold">{editingBlog.title}</h2>
              <img
                src={editingBlog.image}
                alt={editingBlog.title}
                className="w-full h-40 object-cover rounded my-3"
              />
              <p>{editingBlog.description}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded mt-3"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogApp;
