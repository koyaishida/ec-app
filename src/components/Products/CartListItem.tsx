import React,{FC} from "react"
import {ListItem, ListItemText, ListItemAvatar,  IconButton, Divider} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import {Delete} from "@material-ui/icons"
import {useSelector} from "react-redux"
import {getUserId} from "../../reducks/users/selectors"
import {db} from "../../firebase"
import NoImage from "../../assets/img/src/no_image.png"
import {Product} from "../../reducks/products/types"

const useStyles = makeStyles({
  List: {
    height: 128,
  },
  image: {
    objectFit: "cover",
    margin: 16,
    height: 96,
    width: 96,
  },
  text: {
    width: "100%"
  }
})

type ProductInCartProps = {
  productInCart: Product
}


const CartListItem:FC<ProductInCartProps> = (props) =>{
  const classes = useStyles()
  const image = (props.productInCart.images.length > 0 ) ? props.productInCart.images[0].path : NoImage
  const price= props.productInCart.price.toLocaleString()
  const {name,size,cartId} = props.productInCart
  const selector = useSelector((state)=>state)
  const uid = getUserId(selector)

  const removeProduct = (id:string) =>{
    return  db.collection("users").doc(uid).collection("cart").doc(id).delete()
  }
  return (
    <>
      <ListItem className={classes.List}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="商品画像"/>
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText 
            primary={name}
            secondary={`サイズ ${size}`}
          />
          <ListItemText 
            primary={price}
          />
        </div>
        <IconButton onClick={()=>removeProduct(cartId)}>
          <Delete />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  )
}

export default CartListItem