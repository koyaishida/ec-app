import {Product} from "./types"

export const ActionTypes = {
  FETCH_PRODUCTS : "FETCH_PRODUCTS",
  DELETE_PRODUCTS :"DELETE_PRODUCTS" 
} as const 

export const fetchProductsAction = (products:Product[]) => {
  return {
    type: ActionTypes.FETCH_PRODUCTS,
    payload : products
  }
};

export const deleteProductAction = (products:Product[]) => {
  return {
    type: ActionTypes.DELETE_PRODUCTS,
    payload : products
  }
};

type FetchProductsAction = ReturnType<typeof fetchProductsAction>
type DeleteProductAction = ReturnType<typeof deleteProductAction>
export type Actions = FetchProductsAction | DeleteProductAction