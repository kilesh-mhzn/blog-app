import asyncWrapper from "../../Middleware/asyncWrapper.js";
import Posts from "../../Models/post.js";

export const getPosts = asyncWrapper(async (req, res) => {
  // let query = Posts.find({}).select(["title","creator","content","tags", "createdAt"]).sort({ createdAt: -1 });
  // const page = parseInt(req.query.page) || 1;
  // const pageSize = parseInt(req.query.limit) || 10;
  // const skip = (page - 1) * pageSize;
  // const total = await Posts.countDocuments();
  // const pages = Math.ceil(total / pageSize);
  //
  // query = query.skip(skip).limit(pageSize);
  // if(page>pages){
  //   res.status(404).json({
  //     status: "error",
  //     message: "Page not found"
  //   });
  // }
  // const result = await query;
  // res.status(200).json({
  //  status: "success",
  //  posts: result,
  //  pages,
  //  page,
  //  count: result.length,
  // });
    const postData = req.paginatedData
    res.status(200).json({
        status: "success",
        postData

    })
});

export const getPost = asyncWrapper(async(req,res)=>{
    const post = await Posts.findById(req.params.id).select(["title","creator","content","tags", "createdAt"]);
    if(!post){
        res.status(404).json({
            status: "error",
            message: "Post not found"
        });
    }
    res.status(200).json({
        status: "success",
        post
    })
})

export const createPost = asyncWrapper(async (req, res) => {
    const postData =req.body
  const post = await Posts.create(postData);
  res.status(201).json({
    post
  });
});