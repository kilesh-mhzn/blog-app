import {ActionTypes} from "../../../constants/actionTypes";

export default (publicPosts=[], action) => {
    switch(action.type){
        case ActionTypes.GET_PUBLIC_POSTS:
            return action.payload.data;
        case ActionTypes.GET_PUBLIC_POST:
            return action.payload.data;
        default:
            return publicPosts;
    }
}