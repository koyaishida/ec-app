import {createSelector} from "reselect"
import {DefaultRootState} from "react-redux"



const usersSelector = (state:DefaultRootState) => state.users;

export const getIsSignedIn = createSelector(
  [usersSelector],
  state =>state.isSignedIn
)

export const getUserId = createSelector(
  [usersSelector],
  state =>state.uid
)
export const getUsername = createSelector(
  [usersSelector],
  state =>state.username
)
export const getProductsInCart = createSelector(
  [usersSelector],
  state =>state.cart
)
export const getOrderHistory = createSelector(
  [usersSelector],
  state =>state.order
)