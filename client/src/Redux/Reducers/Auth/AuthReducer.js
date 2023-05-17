import {ActionTypes} from "../../../constants/actionTypes"
const AuthReducer = (state = {authData:null, error:null}, action) => {
    switch(action.type){
        case ActionTypes.AUTH:
            if(!action.data.status){
                return {...state, error:action.data.message}
            }else{
                localStorage.setItem('profile', JSON.stringify({...action?.data}))
                return {...state, authData: action?.data, error: null}
            }

        case ActionTypes.LOGOUT:
            localStorage.clear();
            return {...state, authData: null}
        default:
            return state;
    }
}
export default AuthReducer