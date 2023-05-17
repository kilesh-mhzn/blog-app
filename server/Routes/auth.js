import express from "express"

const router  = express.Router()

import {createUser,login} from "../Controllers/Auth/authController.js";

router.post('/signup', createUser)
router.post('/login', login)

export default router;

