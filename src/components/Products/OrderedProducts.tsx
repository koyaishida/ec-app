import React,{FC} from "react"
import {ListItem, ListItemText, ListItemAvatar,  IconButton, Divider} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import {OrderedProduct} from "../../reducks/products/types"
import NoImage from "../../assets/img/src/no_image.png"
import {PrimaryButton} from "../UIkit"
import {useDispatch} from "react-redux"
import {push} from "connected-react-router"

const useStyles = makeStyles({
  List: {
    height: 128,
    backgroundColor:"#fff"
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

type OrderedProductsProps = {
  orderedProduct: OrderedProduct,
  key: number
}


const OrderedProducts:FC<OrderedProductsProps> = (props) =>{

  const classes = useStyles()
  const image = (props.orderedProduct.images.length > 0 ) ? props.orderedProduct.images[0].path : NoImage
  const size = props.orderedProduct.size
  const {price,name,id} = props.orderedProduct
  const dispatch = useDispatch()
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
      <PrimaryButton label={"商品詳細"} onClick={()=>dispatch(push("/product/"+id))}/>
    </ListItem>
    <Divider />
  </>
)
}

export default OrderedProducts