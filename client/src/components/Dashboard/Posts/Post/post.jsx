import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../../../Redux/Actions/Dashboard/postActions';
import { useParams } from 'react-router-dom';
import PostForm from '../PostForm';
const Post = ({ post }) => {
    return (
        <>
            <div>
                My post
                {post?.title}
                <PostForm data={post} />
            </div>
        </>
    );
};
export default Post;
