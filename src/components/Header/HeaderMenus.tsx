import React,{useEffect, FC } from "react" 
import {IconButton ,Badge}from "@material-ui/core"
import {ShoppingCart,FavoriteBorder,Menu} from "@material-ui/icons"
import {getProductsInCart,getUserId} from "../../reducks/users/selectors"
import {useSelector,useDispatch} from "react-redux"
import {db} from "../../firebase"
import {fetchProductsInCart} from "../../reducks/users/operations"
import {push} from "connected-react-router"
import {Product } from "../../reducks/products/types"

type HeaderMenusProps = {
  handleDrawerToggle: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
}

const HeaderMenus:FC<HeaderMenusProps> = (props) =>{
  const selector = useSelector((state)=>state)
  //ここ確認
  let productsInCart:any[] = [1,2,3]
  productsInCart = getProductsInCart(selector)
  const uid = getUserId(selector)
  const dispatch = useDispatch()

  useEffect(()=>{
    const unsubscribe = db.collection("users").doc(uid).collection("cart")
      .onSnapshot(snapshots => {
        snapshots.docChanges().forEach(change =>{
          const product = change.doc.data();
          const changeType = change.type;
        
          switch (changeType) {
            case "added":
              productsInCart.push(product);
              break
            case "modified":
              const index = productsInCart.findIndex((product:Product) => product.cartId === change.doc.id)
              productsInCart[index] = product
              break
            case "removed":
              productsInCart = productsInCart.filter((product:Product)=> product.cartId !== change.doc.id)
              break
            default : 
              break
          }
        })
        dispatch(fetchProductsInCart(productsInCart))
      })
      return () => unsubscribe()
  },[])
  console.log(productsInCart,"cart")

  return (
    <>
      <IconButton onClick={()=>dispatch(push("/cart"))}>
        <Badge badgeContent={productsInCart.length} color="secondary"/> 
        <ShoppingCart />
      </IconButton>
      <IconButton >
        <FavoriteBorder />
      </IconButton>
      <IconButton onClick={(event)=>props.handleDrawerToggle(event)}>
        <Menu />
      </IconButton>
    </>
  )
}

export default HeaderMenus