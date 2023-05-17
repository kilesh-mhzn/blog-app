import axios from "axios"

const URL = axios.create({baseURL:"http://localhost:5000"})

export const signUp =(formData)=>URL.post("/auth/signup", formData)
export const login =(formData)=>URL.post("/auth/login", formData)

export const getUsers = (page)=>URL.get(`/user?page=${page}`)
export const getUser = (id)=>URL.get(`/user/${id}`)

export const getPosts = (page)=>URL.get(`/dashboard/post?page=${page}`)
export const getPost = (id)=>URL.get(`/dashboard/post/${id}`)
export const createPost = (formData)=>URL.post("/dashboard/post", formData)

// test
export const getPublicPosts = ()=>URL.get("/post")
export const getPublicPost = (id)=>URL.get(`/post/${id}`)