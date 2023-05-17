import * as api from "../../../API"
import {ActionTypes} from "../../../constants/actionTypes";

export const getPosts = (page) => {
    return (dispatch) => {
        api.getPosts(page).then(posts => {
            dispatch({
                type: ActionTypes.GET_POSTS,
                    payload: posts
                })
        })
    }
}

export const getPost =  (id) => {
    return (dispatch) => {
         api.getPost(id).then(post => {
            dispatch({
                type: ActionTypes.GET_POST,
                    payload: post
                })
        })
    }
}

export const createPost = (post) => async(dispatch) => {
    try{
        const {data} = await api.createPost(post)
        console.log(data,"created")
        dispatch({type:ActionTypes.CREATE_POST,payload:data})
    }catch (e) {
        console.log(e)
    }

}