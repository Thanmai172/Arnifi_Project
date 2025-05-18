const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  category: String,
  authorName: String, // ✅ this replaces ObjectId ref
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
