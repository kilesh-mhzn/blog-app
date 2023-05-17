import * as api from "../../../API"
import {ActionTypes} from "../../../constants/actionTypes"

export const getUsers = (page) => {
  return (dispatch) => {
    api.getUsers(page).then(users => {
      dispatch({
        type: ActionTypes.GET_USERS,
        payload: users
      })
    })
  }
}

export const getUser = (id)=>{
  return (dispatch) => {
    api.getUser(id).then(user => {
      dispatch({
        type: ActionTypes.GET_USER,
        payload: user
      })
    })
  }
}