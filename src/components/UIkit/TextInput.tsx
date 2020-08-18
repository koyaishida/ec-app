import React ,{FC}from "react"
import {TextField} from "@material-ui/core"


type TextInputProps = {
  fullWidth : boolean,
  label: string,
  multiline: boolean,
  required: boolean,
  rows: number,
  value: string | number,
  type: string,
  onChange:((event: React.ChangeEvent<HTMLInputElement>) => void)
}

const  TextInput:FC<TextInputProps> = (props)=>{
  
  return (
    <TextField
        fullWidth = {props.fullWidth}
        label= {props.label}
        margin="dense"
        multiline={props.multiline}
        required={props.required}
        rows={props.rows}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        />
  )
}

export default TextInput