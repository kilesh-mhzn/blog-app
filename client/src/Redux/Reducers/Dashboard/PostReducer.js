import {ActionTypes} from "../../../constants/actionTypes";

export default (posts=[], action) => {
    switch(action.type){
        case ActionTypes.GET_POSTS:
            return action.payload.data;
        case ActionTypes.GET_POST:
            return action.payload.data;
        case ActionTypes.CREATE_POST:
            return [ action.payload.data.post, ...posts];
        default:
            return posts;
    }
}