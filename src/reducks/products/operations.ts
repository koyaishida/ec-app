import { FirebaseTimeStamp,db } from "../../firebase"
import {push} from "connected-react-router"
import {fetchProductsAction,deleteProductAction,Actions} from "./actions"
import {Product, OrderedProduct, Size, Image} from "../products/types"
import { Dispatch } from 'redux';
import { StoreState } from "../store/types";

const productRef = db.collection("products")



export const deleteProducts = (id:string) =>{
  
  //dispatch()内で呼ばれるから引数に第一引数にdispatchと第二引数にgetStateを受け取れる(デフォルトで)
  return async (dispatch:Dispatch<Actions>,getState:()=>StoreState) => {
    //upload_atかも知れない
    productRef.doc(id).delete()
      .then(()=>{
        const prevProducts = getState().products.list
        const nextProducts = prevProducts.filter((product:Product)=>(
          product.productId !== id
        ))
        dispatch(deleteProductAction(nextProducts))
      })
  }
}


export const fetchProducts = (usage:string,category:string) =>{
  
  return async (dispatch:Dispatch<Actions>) =>{
    let query = productRef.orderBy("created_at","desc")
    query = (usage !== "") ? query.where("usage", "==", usage): query
    query = (category !== "") ? query.where("category", "==", category): query
    //upload_atかも知れない
    query.get()
      .then((snapshots)=>{
        const productLists:any = []
        snapshots.forEach((snapshot)=>{
          const product = snapshot.data()
          productLists.push(product)
        })
        dispatch(fetchProductsAction(productLists))
      })
  }
}


export const orderProducts = (productsInCart:Product[], amount: number) =>{
  
  return async (dispatch:Dispatch, getState:()=> StoreState) => {
    const uid = getState().users.uid
    const userRef = db.collection("users").doc(uid)
    const timestamp = FirebaseTimeStamp.now()
    //productsは注文履歴画面で複数同時注文に対応する為
    let products:OrderedProduct[] = []
    let soldOutProducts:string[] = []

    const batch = db.batch()
    

    for (const product of productsInCart){

      //後日確認,snapshotはSize[]型と分かっているが、ここで型付けすると、firestoreで取得したdataが入らない
      let snapshot:any  = {size:"",quantity: 0}
      snapshot = await productRef.doc(product.productId).get()

      const sizes = snapshot.data().sizes
      
      const updatedSizes = sizes.map((size:Size)=>{
        if (size.size === product.size){
          if(size.quantity === 0 ){
            soldOutProducts.push(product.name)
            return size
          }else{
            return {
            size: size.size,
            quantity: size.quantity - 1
            }
        }
        }else{
          return size
        }
      })
      
      
      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size
      })

      batch.update(
        productRef.doc(product.productId),
        {sizes: updatedSizes}
      )
      batch.delete(
        userRef.collection("cart").doc(product.cartId)
      )
    }

    if (soldOutProducts.length > 0){
      const errorMessage = (soldOutProducts.length > 1) ?
                            soldOutProducts.join("と"):
                            soldOutProducts[0]
      alert("大変申し訳ございません"+ errorMessage + "在庫切れとなった為、注文を中止しました")
      return false
    }else{
      batch.commit()
        .then(()=>{
          const orderRef = userRef.collection("orders").doc()
          const date = timestamp.toDate()
          const shippingDate = FirebaseTimeStamp.fromDate(new Date(date.setDate(date.getDate() + 3)))

          const history = {
            amount : amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shippingDate: shippingDate,
            updated_at : timestamp
          }

          orderRef.set(history)
          dispatch(push("/order/complete"))
        }).catch(()=>{
          alert("注文に失敗しました。もう一度お試し下さい。")
          return false
        })
    }



  }
}

export const saveProduct = (id:string, name:string, description:string, category:string | unknown, usage:string | unknown, price:string, images:Image[],sizes:Size[])=>{
  return async (dispatch:Dispatch) =>{
    const timestamp = FirebaseTimeStamp.now()

    const data = {
      name: name ,
      description: description,
      category: category,
      usage: usage,
      price: parseInt(price),
      productId: id,
      created_at: timestamp,
      images:images,
      sizes:sizes,
      //後からだとCartIdをtypescriptでkeyを追加できない為,空文字列で対応
      cartId: ""
    }

    if(id === ""){
      const ref = productRef.doc()
      id = ref.id
      data.productId = id
      data.created_at = timestamp
    }

    return productRef.doc(id).set(data,{merge:true})
      .then(()=>{
        dispatch(push("/"))
      })
      .catch((error)=>{
        
        throw new Error(error)
      })
  }
}