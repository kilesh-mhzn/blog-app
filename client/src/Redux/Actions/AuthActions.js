import * as api from "../../API/index"
import {ActionTypes} from "../../constants/actionTypes"

export const signUp = (userData, navigate)=>async(dispatch)=>{
    try{
        const{data} =await api.signUp(userData)
        dispatch({type:ActionTypes.AUTH, data})
        navigate('/')
    }catch (e) {
        console.log(e)
    }
}


export const login = (userData, navigate)=>async(dispatch)=>{
    try{
        const {data} = await api.login(userData)
            dispatch({type:ActionTypes.AUTH, data})

        {data.status==="success"&&
            navigate('/')
        }
    }catch (e) {
        console.log(e.message)
    }


}
