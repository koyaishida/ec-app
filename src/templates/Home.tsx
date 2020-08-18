import React from "react"
import {useDispatch,useSelector} from "react-redux"
import {getUserId,getUsername} from "../reducks/users/selectors"
import {signOut} from "../reducks/users/operations"


const Home = () =>{
  const dispatch = useDispatch()
  const selector = useSelector(state =>state)
  const uid = getUserId(selector)
  const username = getUsername(selector)
  
  return (
    <div>
      <h2>Home</h2>
      <h3>{uid}</h3>
       <h4>{username}</h4>
      <button onClick={()=>dispatch(signOut())}>
        サインアウト
      </button>
    </div>
  )
}

export default Home