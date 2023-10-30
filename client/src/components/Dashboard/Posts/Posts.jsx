import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Button, Drawer } from "@material-ui/core";
import PostForm from "./PostForm";
import {
  createPost,
  getPosts,
} from "../../../Redux/Actions/Dashboard/postActions";
import TableSecond from "../../Common/Table/TableSecond";
import { postConstants } from "../Posts/postConstants";
import { useParams, useNavigate } from "react-router-dom";
import { postValidation } from "../../../Validations";
import TextEditor from "../../Common/TextEditor/TextEditor";

const Posts = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [drawer, setDrawer] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openDrawer = (id) => {
    setDrawer(true);
    setSelectedPost(id);
  };
  const initialValue = {
    title: "",
    content: "",
    tags: "",
    selectedFile: "",
  };

  // const user = useSelector(state => state?.Auth?.authData?.result);
  const user = JSON.parse(localStorage.getItem("profile"));
  const pageNumber = parseInt(params?.pageNumber) || 1;

  const [post, setPost] = useState(initialValue);
  const [content, setContent] = useState("");

  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [page, setPage] = useState(pageNumber);
  const [loading, setLoading] = useState(false);
  const postsData = useSelector((state) => state?.post.postData);

  const handleChange = (e) => {
    console.log(e.target.value);
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleTagChange = (e) => {
    setPost({
      ...post,
      tags: e.target.value.replace(/\s/g, "").split(","),
    });
  };
  const handleEdit = (item) => () => {
    openDrawer(item._id);
  };
  const handleView = (id) => () => {
    navigate(`/dashboard/posts/post/${id}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(postValidation(post));
    setIsSubmitting(true);
    if (Object.keys(error).length === 0) {
      dispatch(createPost({ ...post, creator: user?.result.name }));
    }
    // setDrawer(false);
  };

  useEffect(() => {
    // setLoading(true);
    dispatch(getPosts(page));
  }, [page]);
  return (
    <>
      <Helmet>
        <title>Posts</title>
      </Helmet>
      <div className="m-4">
        <div className="flex justify-end">
          <Button onClick={openDrawer}>Add</Button>
        </div>

        <TableSecond
          cols={postConstants(handleEdit, handleView)}
          data={postsData?.result}
          pages={postsData?.pages}
          page={page}
          changePage={setPage}
          loading={loading}
        />

        <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
          <PostForm
            setContent={setContent}
            handleChange={handleChange}
            handleTagChange={handleTagChange}
            handleSubmit={handleSubmit}
            data={post}
            setData={setPost}
            errors={error}
          />

          <div>{content}</div>
        </Drawer>
      </div>
    </>
  );
};

export default Posts;
