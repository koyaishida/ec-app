import React, { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import {ProductCard} from "../components/Products"
import {fetchProducts} from "../reducks/products/operations"
import {getProducts} from "../reducks/products/selectors"


const ProductList = () =>{
  
  const dispatch = useDispatch()
  const selector = useSelector((state:any)=>state)
  const products = getProducts(selector)

  const query = selector.router.location.search
  
  useEffect(()=>{
    
    const usage = /^\?usage=/.test(query) ? query.split("?usage=")[1]:""
    const category = /^\?category=/.test(query) ? query.split("?category=")[1]:""
    dispatch(fetchProducts(usage,category))
  },[query])

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 && (
          products.map((product:any,index:number) =>(
            <ProductCard product={product} key={index}/>
          ))
        )}
      </div>
    </section>

  )
}

export default ProductList 