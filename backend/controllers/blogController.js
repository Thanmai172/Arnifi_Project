const Blog = require('../models/Blog');

// ✅ CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const { title, description, content, category, authorName } = req.body;

    const newBlog = new Blog({
      title,
      description,
      content,
      category,
      authorName, // 👈 Manually entered author name
    });

    await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error('Create Blog Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ✅ GET ALL BLOGS
exports.getBlogs = async (req, res) => {
  const { category, author } = req.query;
  let filter = {};

  if (category) filter.category = category;
  if (author) filter.authorName = author; // ✅ Match the manually entered authorName

  try {
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('Get Blogs Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ GET SINGLE BLOG BY ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json(blog);
  } catch (err) {
    console.error('Get Blog By ID Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Optional: Add ownership check if using authentication
    // if (blog.authorName !== req.user.name) {
    //   return res.status(403).json({ message: 'Unauthorized' });
    // }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json(updatedBlog);
  } catch (err) {
    console.error('Update Blog Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Optional: Add ownership check if using authentication
    // if (blog.authorName !== req.user.name) {
    //   return res.status(403).json({ message: 'Unauthorized' });
    // }

    await blog.deleteOne();

    res.json({ message: 'Blog deleted' });
  } catch (err) {
    console.error('Delete Blog Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
