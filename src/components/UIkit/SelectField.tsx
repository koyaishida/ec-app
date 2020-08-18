import React,{FC} from "react"
import {InputLabel,MenuItem,FormControl,Select} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"

const useStyles = makeStyles ({
  "formControl" : {
    marginBottom: 16,
    minWidth:128,
    width:"100%"
  }
})

type Option = {
  id:string,
  name:string
}


//selectの型は @material UIの selectコンポーネント内でvalueで受け取る値がstringとは限らない為、unknownを許容している。
type SelectFieldProps = {
  label: string,
  required: boolean,
  options: Option[],
  select: (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
    }>, child: React.ReactNode) => void,
  value: string | unknown ,
}

const  SelectField:FC<SelectFieldProps>  =(props)=>{
  const classes= useStyles()
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.value}
        required={props.required}
       //e.target.valueの値はidが表示されるのに.setCategoryにはnameが入る
        onChange={props.select}
      >
        {props.options.map((option:Option,index:number)=>(
          <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
        ))}

      </Select>
    </FormControl>
  )
}

export default SelectField