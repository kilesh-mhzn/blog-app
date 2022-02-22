import express from 'express';
const router = express.Router();
import  {getPosts,createPost} from "../Controllers/Dashboard/postsController.js";

// router.get('/',getPosts);
// router.post('/',createPost);

router.route('/').get(getPosts).post(createPost);

export default router;

