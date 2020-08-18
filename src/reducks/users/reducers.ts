import  {ActionTypes, Actions} from "./actions"
import  { UserState } from "./types"
import initialState from "../store/initialState"

export const UsersReducer = (userState:UserState = initialState.users, action:Actions) => {
  switch (action.type){
    case ActionTypes.SIGN_IN:
      return {
        ...userState,
        ...action.payload
      }
    case ActionTypes.SIGN_OUT:
      return {
        ...action.payload
      }
    case ActionTypes.FETCH_PRODUCTS_IN_CART:
      return {
        ...userState,
        cart: [...action.payload]
      }
    case ActionTypes.FETCH_ORDER_HISTORY:
      return {
        ...userState,
        order: [...action.payload]
      }
    default: 
      return userState
  }
}