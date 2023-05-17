import {combineReducers} from "redux";
import auth from "./Auth/AuthReducer";
import user from "./Dashboard/UserReducer";
import post from "./Dashboard/PostReducer";
import publicPost from "./Public/PostReducer"

export default combineReducers({
    auth,
    user,
    post,
    publicPost,
})