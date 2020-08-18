import React,{useCallback,useMemo} from "react"
import {useDispatch,useSelector,DefaultRootState} from "react-redux"
import {getProductsInCart} from "../reducks/users/selectors"
import {makeStyles,Theme,createStyles} from "@material-ui/core/styles"
import {List,Divider} from "@material-ui/core"
import {CartListItem} from "../components/Products/"
import {PrimaryButton,TextDetail} from "../components/UIkit"
import {Product} from "../reducks/products/types"
import {orderProducts} from "../reducks/products/operations"





const useStyles = makeStyles((theme:Theme)=>
createStyles({
  detailBox: {
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: 320
    },
    [theme.breakpoints.up("sm")]: {
      width: 512
    },
  },
  orderBox:{
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: 4,
    boxShadow: "0 4px 2px 2px rgba(0,0,0,0.2",
    height: 256,
    margin: "24px auto 16px auto",
    padding: 16,
    width: 288,
  }
}))

const OrderConfirm = () =>{
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state:DefaultRootState)=> state)
  const productsInCart = getProductsInCart(selector)

  const subTotal:number = useMemo(()=>{
    return productsInCart.reduce((sum:number,product:Product)=>(
      sum += product.price),0
    )
  },[productsInCart])

  const shippingFee:number = useMemo(()=>{
    return (
      (subTotal < 10000) ? 210 : 0
    )
  },[productsInCart])

  
  const tax:number = subTotal * 0.1

  const total:number = subTotal + shippingFee + tax

  const order = useCallback(()=>{
    dispatch(orderProducts(productsInCart,total))
  },[productsInCart,total])

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 &&(
              productsInCart.map((product: Product,index: number) => (
                <CartListItem productInCart={product} key={index}/>
              ))
            )}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail label={"商品合計"} value={"¥"+subTotal.toLocaleString()}/>
          <TextDetail label={"消費税"} value={"¥" + tax}/>
          <TextDetail label={"送料"} value={"¥" + shippingFee}/>
          <Divider />
          <TextDetail label={"合計(税込)"} value={total.toLocaleString()}/>
          <PrimaryButton label={"注文する"}onClick={order}/>
        </div>
      </div>
    </section>
  )

}

export default OrderConfirm