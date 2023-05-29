const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
