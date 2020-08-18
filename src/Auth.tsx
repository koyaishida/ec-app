import React ,{useEffect}from "react"
import {useSelector, useDispatch} from "react-redux"
import {getIsSignedIn }from "./reducks/users/selectors"
import {listenAuthState }from "./reducks/users/operations"



const Auth = ({children}:any) =>{
  const dispatch = useDispatch()
  const selector = useSelector((state:any)=>state)
  const isSignedIn = getIsSignedIn(selector)

  useEffect(()=>{
    if(!isSignedIn){
      dispatch(listenAuthState())
    }
  },[])
  if(!isSignedIn){
    return <></>
  } else {
    return children
  }
}

export default Auth