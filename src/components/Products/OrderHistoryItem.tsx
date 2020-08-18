import React,{FC, useMemo} from "react"
import {ListItem, List, Divider} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import {TextDetail} from "../UIkit"
import {OrderedProducts} from "./index"
import {OrdersHistory,OrderedProduct} from "../../reducks/products/types"
 
const useStyles = makeStyles({
   list: {
     backgroundColor: "#f5f5f5"
   },
  image: {
    objectFit: "cover",
    margin: 16,
    height: 96,
    width: 96,
  },
  text: {
    width: "100%"
  },
  orderBox:{
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: 4,
    boxShadow: "0 4px 2px 2px rgba(0,0,0,0.2",
    margin: "24px auto 16px auto",
    padding: 16,
    width: "100%",
  }
})

type OrderedHistoryItemProps = {
  orderHistory: OrdersHistory,
  key:number
}

const dateToString = (timestamp: firebase.firestore.Timestamp) => {
  return timestamp.toDate().toLocaleString().slice(0,8)
}



const OrderHistoryItem:FC<OrderedHistoryItemProps> = (props) =>{
  const classes = useStyles()
  
  //productsをorderedProductsにpropsで渡して、mapする
  const {id,products} = props.orderHistory
  const updated_at = dateToString(props.orderHistory.updated_at)
  const shippingDate = dateToString(props.orderHistory.shippingDate)

  
   const price:number = useMemo(()=>{
     return products.reduce((sum:number,product:OrderedProduct)=>(
       sum += product.price),0
     )
   },[products])

  
  return (
    <>
      <ListItem className={classes.list}>
        <div className="module-spacer--small" />
        <div className={classes.orderBox}>
          <TextDetail label={"注文ID"} value={id}/>
          <TextDetail label={"注文日時"} value={updated_at}/>
          <TextDetail label={"発送予定日"} value={shippingDate}/>
          <TextDetail label={"注文金額"} value={price}/>
          <List>
            {products.map((product:OrderedProduct,index:number)=>(
              <OrderedProducts orderedProduct={product}key={index}/>
            ))}
            <Divider />
          </List> 
        </div>
      </ListItem>
      <Divider />
    </>
  )
}

export default OrderHistoryItem