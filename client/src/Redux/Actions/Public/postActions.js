import * as api from "../../../API"
import {ActionTypes} from "../../../constants/actionTypes";

export const getPosts = () => {
    return (dispatch) => {
        api.getPublicPosts().then(posts => {
            dispatch({
                type: ActionTypes.GET_PUBLIC_POSTS,
                payload: posts
            })
        })
    }
}

export const getPost = (id) => {
    return (dispatch) => {
        api.getPublicPost(id).then(post => {
            dispatch({
                type: ActionTypes.GET_PUBLIC_POST,
                payload: post
            })
        })
    }
}