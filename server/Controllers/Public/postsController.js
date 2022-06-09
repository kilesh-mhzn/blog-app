import asyncWrapper from "../../Middleware/asyncWrapper.js";
import Posts from "../../Models/post.js";

export const getPosts = asyncWrapper(async (req, res) => {
  const posts = await Posts.find().sort({ createdAt: -1 });
  res.json({posts});
});

export const getPost = asyncWrapper(async (req, res) => {
  const post = await Posts.findById(req.params.id);
  res.json({post});
});