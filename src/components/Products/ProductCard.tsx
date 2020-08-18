import React ,{useState, FC} from "react"
import {Card,CardContent,CardMedia,Typography,Menu,MenuItem,IconButton} from "@material-ui/core"
import {makeStyles,Theme,createStyles} from '@material-ui/core/styles';
import NoImage from "../../assets/img/src/no_image.png"
import {push} from "connected-react-router"
import {useDispatch} from "react-redux"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import {deleteProducts} from "../../reducks/products/operations"
import {Product} from "../../reducks/products/types"



 
const useStyles = makeStyles((theme:Theme) => 
createStyles({
  root :{
    [theme.breakpoints.down('sm')]:{
      margin:8,
      // -の前後はスペースが必要
      width: "calc(50% - 16px)",
    },
    [theme.breakpoints.up('sm')]:{
      margin:16,
      width: "calc(33.3333% - 32px)",
    }
  },
  content: {
    display: "flex",
    padding: "16px 8px",
    textAlign: "left",
    "&:last-child":{
      padding: 16
    }
  },
  media: {
    height: 0,
    paddingTop: "100%"
  },
  price : {
    color: theme.palette.secondary.main,
    fontSize: 16,
  }
}))

type ProductCardProps = {
  product:Product
  key: number
}


const ProductCard:FC<ProductCardProps> = (props) =>{
  const {productId, name } = props.product
  const images = (props.product.images.length > 0) ? props.product.images : [{path: NoImage}]
  const dispatch = useDispatch()
  const price = props.product.price.toLocaleString()
  const classes = useStyles()
  const [anchorEL,setAnchorEL] = useState<null | EventTarget & HTMLButtonElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //後日確認
    setAnchorEL(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEL(null)
  }

  return (
    <Card
     className={classes.root}
      >
      <CardMedia 
        image={images[0].path}  
        className={classes.media}
        title=""
        onClick={() => dispatch(push("/product/" + productId))}
      />
      <CardContent className={classes.content} >
        <div onClick={() => dispatch(push("/product/" + productId))}>
          <Typography color="textSecondary" component="p">
            {name}
          </Typography>
          <Typography className={classes.price}  component="p">
            ¥{price}
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        
        <Menu anchorEl={anchorEL} keepMounted open={Boolean(anchorEL)} onClose={handleClose}>
          <MenuItem 
            onClick={() => {
                      dispatch(push("/product/edit/"+productId)) 
                      handleClose()
            }}>
              編集する
          </MenuItem>
          <MenuItem onClick={()=>dispatch(deleteProducts(productId))}>削除する</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
}

export default ProductCard