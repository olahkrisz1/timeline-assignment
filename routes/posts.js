const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// Create a new post
router.post("/posts", (req, res) => {
  const { content } = req.body;

  const post = new Post({ content });
  post
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => console.error("Error saving post:", err));
});

// Get all posts
router.get("/posts", (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.render("index", { posts }))
    .catch((err) => console.error("Error retrieving posts:", err));
});

// Create a comment for a post
router.post("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ content });
    await post.save();

    // Redirect the user back to the homepage
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
