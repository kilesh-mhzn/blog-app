import {ActionTypes} from "../../../constants/actionTypes";

export default(users = [], action) => {
  switch (action.type) {
      case ActionTypes.GET_USERS:
          return action.payload.data.usersData;
      case ActionTypes.GET_USER:
          console.log(action.payload);
          return action.payload;
      default:
        return users;
  }
};