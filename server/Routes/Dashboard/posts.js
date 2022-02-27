import express from 'express';
const router = express.Router();
import {getPosts, createPost, getPost} from "../../Controllers/Dashboard/postsController.js";
import Post from "../../Models/post.js"
import {pagination} from "../../Middleware/pagination.js";


router.get('/', pagination(Post,["title","creator","content","tags", "createdAt"]), getPosts);
router.get('/:id',getPost)


router.post('/',createPost);

// router.route('/').get(getPosts).post(createPost);

export default router;

