import React ,{useState,useMemo, useCallback, FC}from  "react"
import {TableContainer,Paper,Table,TableBody,TableCell,TableHead,TableRow,IconButton,} from "@material-ui/core"
import {CheckCircle,Delete,Edit} from "@material-ui/icons"
import {makeStyles} from "@material-ui/styles"
import TextInput from "../UIkit/TextInput"
import {Size } from "../../reducks/products/types"

const useStyles = makeStyles ({
  "iconCell" :{
    height: 48,
    width:48,
  },
  "checkIcon":{
    float:"right"
  }
})

type SetSizeAreaProps ={
  sizes: Size[],
  setSizes: React.Dispatch<React.SetStateAction<Size[]>>
}


const SetSizeArea: FC<SetSizeAreaProps> = (props) =>{

  const classes = useStyles()
  const [index,setIndex] = useState(0),
        [size,setSize] = useState(""),
        [quantity,setQuantity] = useState(0)


  const inputSize = useCallback((event)=>{
    setSize(event.target.value)
  },[setSize])

  const inputQuantity = useCallback((event)=>{
    setQuantity(event.target.value)
  },[setQuantity])


  const addSize = (index:number,size:string,quantity:number) => {
    if(size === "" || quantity === 0 ){
      return false
    }else{
      if( index === props.sizes.length){
        props.setSizes((prevState:Size[]) => [...prevState,{size:size,quantity:quantity}])
        setIndex(index + 1)
        setSize("")
        setQuantity(0)
      }else{
        const newSizes = props.sizes
        newSizes[index] = {size: size, quantity: quantity}
        props.setSizes(newSizes)
        setIndex(newSizes.length)
        setSize("")
        setQuantity(0)
      }
      
    }
  }

  const editSize = (index:number,size:string,quantity:number) => {
    setIndex(index)
    setSize(size)
    setQuantity(quantity)
  }

  const deleteSize = (deleteIndex:number) => {
    const newSizes = props.sizes.filter((item:Size, i:number)=> deleteIndex !== i)
    props.setSizes(newSizes)
  }


  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell}></TableCell>
              <TableCell className={classes.iconCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 && (
              props.sizes.map((item:Size ,i:number) => (
                <TableRow key={i}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell >
                    <IconButton className={classes.iconCell} onClick={()=>editSize(i,item.size,item.quantity)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell >
                    <IconButton className={classes.iconCell} onClick={()=>deleteSize(i)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div>
          <TextInput 
            fullWidth={false} label={"サイズ"} multiline={false} required={true} onChange={inputSize} rows={1} value={size} type={"text"}
          />

          <TextInput 
            fullWidth={false} label={"数量"} multiline={false} required={true} onChange={inputQuantity} rows={1} value={quantity} type={"number"}
          />
        </div>
        <IconButton className={classes.checkIcon} onClick={()=>addSize(index,size,quantity)}>
          <CheckCircle />
        </IconButton>
      </TableContainer>
    </div>
  )
}

export default SetSizeArea