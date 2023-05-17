import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getPosts} from "../../Redux/Actions/Public/postActions";
import {Helmet} from "react-helmet";
import PostsFeed from "../../components/Public/Homepage/PostsFeed";

const Homepage = () => {
    const params = useParams();

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"))
    const postsData = useSelector(state => state?.Post)
    const pageNumber = parseInt(params?.pageNumber) || 1
    const [page, setPage] = useState(pageNumber);
    const [loading, setLoading] = useState(false);
    const posts = postsData?.posts;

    useEffect(()=>{
        dispatch(getPosts())
    },[])
    return(
        <>
            <Helmet>
                <title>Home Public</title>
            </Helmet>

            <PostsFeed />
        </>
    )
}

export default Homepage;