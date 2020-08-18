import React,{useState,useEffect,useCallback} from "react"
import { db, FirebaseTimeStamp } from "../firebase"
import {useSelector, useDispatch, DefaultRootState} from "react-redux"
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles"
import HTMLReactParser from "html-react-parser"
import {ImageSwiper,SizeTable} from "../components/Products"
import {addProductToCart} from "../reducks/users/operations"
import {Product } from "../reducks/products/types"





const useStyles = makeStyles((theme:Theme) => 
createStyles({
  sliderBox: {
    [theme.breakpoints.down("sm")]:{
      margin: "0 auto 24px auto",
      height: 320,
      width:320,
    },
    [theme.breakpoints.up("sm")]:{
      margin: "0 auto",
      height: 400,
      width: 400,
    }
  },
  detail: {
    textAlgin: "left",
    [theme.breakpoints.down("sm")]:{
      margin: "0 auto 16px auto",
      height: "auto",
      width:320,
    },
    [theme.breakpoints.up("sm")]:{
      margin: "0 auto",
      height: "auto",
      width: 400,
    }
  },
  price: {
    fontSize: 36
  }
}))

const returnCodeToBr = (text: string)=>{
  if(text === ""){
    return text
  }else{
    return HTMLReactParser(text.replace(/\r?\n/g,"<br>"))
  }
}

const ProductDetail = ()=>{

  const selector = useSelector((state:any) => state)
  const path = selector.router.location.pathname
  const id = path.split("/product/")[1]
  const classes = useStyles()
  const dispatch = useDispatch()

  const [product,setProduct] = useState<any>()

  useEffect (()=>{
    db.collection("products").doc(id).get()
      .then((doc)=>{
        const data = doc.data()
        setProduct(data)
      })
  },[])
  
  const addProduct = useCallback((selectedSize) => {
    const timestamp = FirebaseTimeStamp.now()
    dispatch(addProductToCart({
      added_at: timestamp,
      description: product.description,
      images: product.images,
      name: product.name,
      price: product.price,
      productId: id,
      quantity: 1,
      size: selectedSize,
      cartId: ""
    }))
  },[product])

return (
  <section className="c-section-wrapin">
    {product && (
      <div className="p-grid__row">
        <div className={classes.sliderBox}>
          <ImageSwiper images={product.images}/>
        </div>
        <div className={classes.detail}>
          <h2 className="u-text__headline">{product.name}</h2>
          <p className={classes.price}>{product.price.toLocaleString()}</p>

          <div className="module-spacer-small"/>
            <SizeTable sizes={product.sizes} addProduct={addProduct}/>
          <div className="module-spacer-small"/>

          <p>{returnCodeToBr(product.description)}</p>
        </div>
      </div>
    )}
  </section>
)
}

export default ProductDetail