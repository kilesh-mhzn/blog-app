import Users from "../../Models/user.js"
import asyncWrapper from "../../Middleware/asyncWrapper.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const createUser = asyncWrapper(async(req, res)=>{
    const {firstName,lastName,email, password, confirmPassword, role} = req.body

    const existingUser = await Users.findOne({email})
    if(existingUser) return res.status(404).json({message:"User already exists"})

    if(password !== confirmPassword) return res.status(404).json({message:"Password dont match"})

    const hashedPassword=await bcrypt.hash(password,12)
    const user = await Users.create({email, password:hashedPassword, name:`${firstName} ${lastName}`, role})
    const token = jwt.sign({email: user.email, id:user._id},"medium", {expiresIn: "1h"})

    res.status(200).json({user, token})
})

export const login = asyncWrapper(async (req, res)=>{
    const {email, password} = req.body
    const existingUser = await Users.findOne({email})
    if(!existingUser) return res.status(200).json({message: "User doesnt exist"})

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    if(!isPasswordCorrect) return res.status(200).json({message: "Incorrect credentials"})

    const token =jwt.sign({email:existingUser.email, id:existingUser._id},"medium", {expiresIn: "1h"})

    res.status(200).json({status:"success", result:existingUser, token})
})

