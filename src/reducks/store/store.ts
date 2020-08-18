
import { createStore as reduxCreateStore, combineReducers,applyMiddleware}from "redux"
import {ProductsReducer} from  "../products/reducers"
import {UsersReducer} from "../users/reducers"
import {connectRouter,routerMiddleware} from "connected-react-router"
import thunk from "redux-thunk"
import * as History from "history"


//ここのhistoryはただの引数、
//ここのcreateStoreは関数定義のみ,実行はindex.tsxで行う
export default function createStore(history:History.History<History.History.PoorMansUnknown>){
  return reduxCreateStore(
    combineReducers({
      router:connectRouter(history),
      products: ProductsReducer,
      users:UsersReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
}

export type RootState = ReturnType<typeof reduxCreateStore>