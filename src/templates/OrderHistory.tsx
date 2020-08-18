import React, {FC,useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { getOrderHistory} from "../reducks/users/selectors"
import {List,} from '@material-ui/core/';
import {OrderHistoryItem} from "../components/Products"
import {fetchOrderHistory} from "../reducks/users/operations"
import {OrdersHistory} from "../reducks/products/types"

const OrderHistory:FC = () => {
  const selector = useSelector((state)=>state)
  const dispatch= useDispatch()
  const orderHistory = getOrderHistory(selector)



  useEffect(()=>{
    dispatch(fetchOrderHistory())
  },[])
  
  
  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">
        注文履歴
      </h2>
      
      <List>
        {orderHistory.length > 0 && (
          orderHistory.map((orderHistory:OrdersHistory,index: number)=>(
            <OrderHistoryItem orderHistory={orderHistory} key={index} />
          ))
        )}
      </List>
    </section>
  )
}

export default OrderHistory 