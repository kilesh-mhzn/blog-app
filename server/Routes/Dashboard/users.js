import express from "express"
import Users from "../../Models/user.js";

const router  = express.Router()

import {getUsers,getUser, updateRole} from "../../Controllers/Dashboard/userController.js";
import {pagination} from "../../Middleware/pagination.js";

router.get('/',pagination(Users) ,getUsers)
router.get('/:id', getUser)
router.patch('/:id', updateRole)
export default router;

