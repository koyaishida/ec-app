import React,{useCallback,FC} from "react"
import {IconButton} from "@material-ui/core"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import {makeStyles} from "@material-ui/styles"
import {storage} from "../../firebase/index"
import ImagePreview from "./imagePreview"
import {Image} from "../../reducks/products/types"

type ImageAreaProps = {
  images: Image[],
  setImages: React.Dispatch<React.SetStateAction<Image[]>>
}

const useStyles = makeStyles({
  "icon": {
    height:48,
    width:48,
  }
})


const ImageArea:FC<ImageAreaProps> = (props) => {
  const classes = useStyles()



  const uploadImage = useCallback((event)=> {
    const file = event.target.files
    let blob = new Blob(file, {type: "image/jpeg"})

    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIKLMNOPQRSTUVWXYZ0123456789"
    const N = 16
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join("")

    const uploadRef = storage.ref("images").child(fileName)
    const uploadTask =  uploadRef.put(blob)

    uploadTask.then(() => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
        const newImage = {id:fileName,path: downloadURL};
        props.setImages(((prevState) => [...prevState,newImage]))
      })
    })
  },[props.setImages])

  
  const deleteImage = useCallback(async(id:string)=>{
    const ret = window.confirm("この画像を削除しますか？")
    if(!ret){
      return false
    }else {
      const newImages:Image[] = props.images.filter((image:Image) =>image.id !== id)
      props.setImages(newImages)
      return storage.ref("images").child(id).delete()
    }
  },[props.images])

  return (
    <div>
      <div className="p-grid__list-images">
        {props.images.length > 0 && (
          props.images.map((image:Image,index:number) =>
            <ImagePreview delete={deleteImage} image={image} key={index} /> 
        ))}
      </div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input className="u-display-none" type="file" id="image" 
                   onChange={(event: React.ChangeEvent<HTMLInputElement>)=>uploadImage(event)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  )
}

export default ImageArea