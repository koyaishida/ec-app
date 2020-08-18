import {createSelector} from "reselect"
import {DefaultRootState} from "react-redux"


const productsSelector = (state:DefaultRootState) => state.products;

export const getProducts = createSelector(
  [productsSelector],
  state =>state.list
)

