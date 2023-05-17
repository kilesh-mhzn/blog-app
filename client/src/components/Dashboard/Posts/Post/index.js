import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../../../Redux/Actions/Dashboard/postActions';
import { useParams, useNavigate } from 'react-router-dom';
import Post from './post';
import { Button } from '@material-ui/core';
const DashboardPost = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => state?.post.post);
    useEffect(() => {
        dispatch(getPost(params.id));
    }, []);
    return (
        <>
            <div className="card m-4 p-4">
                <Button onClick={() => navigate(-1)}>Go Back</Button>

                <Post post={post} />
            </div>
        </>
    );
};
export default DashboardPost;
