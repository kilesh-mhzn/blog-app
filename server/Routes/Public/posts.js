import express from 'express';
const router = express.Router();
import {getPosts, getPost} from "../../Controllers/Public/postsController.js";

router.route('/')
    .get(getPosts);

router.route('/:id')
    .get(getPost);

export default router;