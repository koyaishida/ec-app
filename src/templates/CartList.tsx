import React ,{useCallback}from "react"
import {useDispatch, useSelector} from "react-redux"
import { getProductsInCart} from "../reducks/users/selectors"
import {List,} from '@material-ui/core/';
import {CartListItem} from "../components/Products"
import {PrimaryButton,GrayButton} from "../components/UIkit"
import {push} from "connected-react-router"
import {makeStyles} from "@material-ui/styles"
import {Product} from "../reducks/products/types"

const useStyles = makeStyles({
  root :{
    margin: "0 auto",
    maxWidth: 512,
    width: "100%"
  }
})


const CartList = () =>{
  const selector = useSelector((state)=>state)
  const productsInCart = getProductsInCart(selector)
  const dispatch = useDispatch()
  const classes = useStyles()

  const goToOrder = useCallback(()=>{
    dispatch(push("/cart/confirm"))
  },[])

  const goToHome = useCallback(()=>{
    dispatch(push("/"))
  },[])
  
  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">
        ショッピングカート
      </h2>
      <List className={classes.root}>
      {productsInCart.length > 0 && (
          productsInCart.map((productInCart:Product,index:number) =>(
            <CartListItem productInCart={productInCart} key={index} />
          ))
        )}
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__column">
        <PrimaryButton label={"レジへ進む"} onClick={goToOrder}/>
      </div>
      <div className="module-spacer-extra-small" />
      <GrayButton label={"ショッピングを続ける"} onClick={goToHome}/>
    </section>

  )
}

export default CartList