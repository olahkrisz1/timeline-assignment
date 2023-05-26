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

module.exports = router;
