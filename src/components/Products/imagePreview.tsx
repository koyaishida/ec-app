import React,{FC} from "react"
import {Image} from "../../reducks/products/types"

type ImagePreViewProps = {
  delete:(id: string) => Promise<any>,
  key:number,
  image: Image
}

const ImagePreview:FC<ImagePreViewProps> = (props) =>{
  const {path, id} = props.image
  return (
    <div className="p-media__thumb">
      <img alt="プレビュー画像" src={path} onClick={()=>props.delete(id)}/>
    </div>
  )
}

export default ImagePreview