const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// Create a new post
router.post("/posts", (req, res) => {
  const { content } = req.body;

  // Validate post content
  if (content.length < 25) {
    const error = new Error("Post must be at least 25 characters long");
    // Render the error view template
    return res.render("error", { message: error.message });
  }

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
router.post("/posts/:postId/comments", (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Validate comment content
      if (content.length < 100) {
        throw new Error("Comment must be at least 100 characters long");
      }

      post.comments.push({ content });
      return post.save();
    })
    .then(() => {
      // Redirect the user back to the homepage
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
      // Render an error view with the error message
      res.render("error", { message: err.message });
    });
});

module.exports = router;
