import React,{FC} from "react"
import {Button} from "@material-ui/core"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"


const useStyles =  makeStyles((theme:Theme)=>
  createStyles({
    "button" : {
      backgroundColor : theme.palette.grey["300"],
      fontSize:16,
      height: 48,
      marginBottom:16,
      width: 256,}
}))

type ButtonProps = {
  onClick: () => void,
  label: string
}

const GrayButton:FC<ButtonProps> = (props) =>{

  const classes = useStyles();
 return (
   <Button className={classes.button} variant="contained" onClick={props.onClick}>
     {props.label}
   </Button>
 )
}

export default GrayButton