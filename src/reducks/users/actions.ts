
import {UserState} from "./types"
import {Product, OrdersHistory} from "../products/types"

export const ActionTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  FETCH_PRODUCTS_IN_CART: "FETCH_PRODUCTS_IN_CART",
  FETCH_ORDER_HISTORY: "FETCH_ORDER_HISTORY",
} as const 


export const signInAction = (userState:UserState) => {
  return {
    type: ActionTypes.SIGN_IN,
    payload : {
      isSignedIn : true,
      uid : userState.uid,
      username: userState.username
    }
  }
};
type SignInAction = ReturnType<typeof signInAction>

export const signOutAction = ()=>{
  return {
    type: ActionTypes.SIGN_OUT,
    payload: {
      isSignedIn : false,
      uid : "",
      username: ""
    }
  }
}
type SignOutAction = ReturnType<typeof signOutAction>


export const fetchProductsInCartAction = (products:Product[])=>{
  return {
    type: ActionTypes.FETCH_PRODUCTS_IN_CART,
    payload: products
  }
}
type FetchProductsInCartAction = ReturnType<typeof fetchProductsInCartAction>

export const fetchOrderHistoryAction = (orderList:OrdersHistory[])=>{
  return {
    type: ActionTypes.FETCH_ORDER_HISTORY,
    payload: orderList
  }
}
type FetchOrderHistoryAction = ReturnType<typeof fetchOrderHistoryAction>

export type Actions = SignInAction | SignOutAction | FetchProductsInCartAction | FetchOrderHistoryAction

