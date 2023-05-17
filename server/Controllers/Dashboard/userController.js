import Users from "../../Models/user.js"
import asyncWrapper from "../../Middleware/asyncWrapper.js";
import mongoose from "mongoose";

export const getUsers = asyncWrapper(async (req, res) => {
    const usersData = req.paginatedData
    res.status(200).json({
        status: "success",
        count: usersData.result.length,
        usersData
    });
});


export const getUser = async(req, res) => {
    try{
        const user = await Users.findById(req.params.id)
        res.status(200).json({user})
    }catch (e) {
        console.log(e)
    }
}

export const updateRole = asyncWrapper(async (req, res)=>{
    const {id} = req.params
    const {role} = req.body
    console.log(role)
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `User not found with ID: ${id}`})
    const userData = await Users.findById(id)
    console.log(userData.role)
    if(!userData) return res.status(404).json({message: `User not found with ID: ${id}`})
    userData.role.push(role)

    const updatedUser = await Users.findByIdAndUpdate(id, {...userData,role}, {new:true})
    res.status(200).json({updatedUser})
})
