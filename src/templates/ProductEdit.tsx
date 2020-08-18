import React ,{useState,useCallback,useEffect}from "react"
import { TextInput ,SelectField, PrimaryButton} from "../components/UIkit"
import {ImageArea,SetSizeArea} from "../components/Products"
import { useDispatch } from "react-redux"
import {saveProduct} from "../reducks/products/operations"
import { db } from "../firebase"
import {Image, Size} from "../reducks/products/types"

type Option = {
  id:string,
  name:string
}


                    
 const ProductEdit = () =>{
  const dispatch = useDispatch()

  let id = window.location.pathname.split("/product/edit")[1];
  if(id !==""){
    id = id.split("/")[1]
  }

  const [name,setName] = useState(""),
        [description,setDescription] = useState(""),

        [category,setCategory] = useState<string | unknown>(""),
        [categories,setCategories] = useState<any[]>([]),

        [usage,setUsage] = useState<string | unknown>(""),
        // [usages,setUsages] = useState<any[]>([]),
        [price,setPrice] = useState("0"),
        [images,setImages] = useState<Image[]>([]),
        [sizes,setSizes] = useState<Size[]>([])

        const inputName = useCallback((event) =>{
          setName(event.target.value)
        },[setName])

        const selectCategory:((event: React.ChangeEvent<{
          name?: string | undefined;
          value: unknown;
      }>, child: React.ReactNode) => void) = ((event)=>setCategory(event.target.value as string))

        const selectUsage:((event: React.ChangeEvent<{
          name?: string | undefined;
          value: unknown;
      }>, child: React.ReactNode) => void) = ((event)=>setUsage(event.target.value as string))

        
        
        const inputDescription = useCallback((event) =>{
          setDescription(event.target.value)
        },[setDescription])

        const inputPrice = useCallback((event) =>{
          setPrice(event.target.value)
        },[setPrice])

        
        const usages = [
          {id:"all",name:"全て"},
          {id:"home",name:"家庭用"},
          {id:"business",name:"業務用"}
        ]

  useEffect (()=>{
    if(id !== ""){
      db.collection("products").doc(id).get()
        .then((snapshot)=>{
          const data = snapshot.data()
          if(data == undefined){
            return false
          }
          setName(data.name)
          setDescription(data.description)
          setCategory(data.category)
          setUsage(data.usage)
          setPrice(data.price)
          setImages(data.images)
          setSizes(data.sizes)
        })
      }
  },[id])

  useEffect(() => {
    db.collection("categories")
    .orderBy("order","asc")
    .get()
      .then((snapshots) => {
        const list:any[] = []
        snapshots.forEach((snapshot)=>{
          const data = snapshot.data()
          list.push({
            id: data.id,
            name: data.name
          })
        })
      setCategories(list)
      })
  },[])
  
  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages}/>
        <TextInput 
          fullWidth = {true}
          label= {"商品名"}
          multiline={false}
          required={true}
          rows={1}
          value={name}
          type={"text"}
          onChange={inputName}
        />
        <TextInput 
          fullWidth = {true}
          label= {"商品説明"}
          multiline={true}
          required={true}
          rows={5}
          value={description}
          type={"text"}
          onChange={inputDescription}
        />
        <SelectField 
          label={"カテゴリ"}
          required={true}
          options={categories}
          select={selectCategory}
          value={category}
        />
        <SelectField 
          label={"使用法"}
          required={true}
          options={usages}
          select={selectUsage}
          value={usage}
        />
        <TextInput 
          fullWidth = {true}
          label= {"価格"}
          multiline={false}
          required={true}
          rows={1}
          value={price}
          type={"number"}
          onChange={inputPrice}
        />
        <div className="module-spacer--small"/>
        <SetSizeArea sizes={sizes} setSizes={setSizes}/>
        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton 
            label={"商品情報を登録する"}
            onClick={()=>dispatch(saveProduct(id,name,description,category,usage,price,images,sizes))}
          />
        </div>

      </div>
    </section>
  )
}

export default ProductEdit