import {useEffect, useState } from "react";
import SinglePost from "../../components/Public/SinglePost";
import {useLocation} from "react-router-dom";
import {getPost} from "../../Redux/Actions/Public/postActions";
import {useDispatch} from "react-redux";

const PostView = () =>{
    const location = useLocation()
    const postId = location.pathname.split("/")[2]
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPost(postId))
    }, [])


  return (
    <div className="grid grid-cols-3 gap-4 container">
        <div className="col-span-3 md:col-span-2">
          <SinglePost />
        </div>
        <div className="col-span-3 md:col-span-1">
        </div>
    </div>
  );
}

export default PostView;