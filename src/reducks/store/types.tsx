
import 'react-redux'
import { Dispatch } from 'redux'

export type StoreState = {
  products : {
   list:[]
  },
  users : {
    cart:[],
    order:[],
    isSignedIn: false,
    uid: string,
    username: string,
  }
}

declare module 'react-redux' {
  interface DefaultRootState extends StoreState {}
}
