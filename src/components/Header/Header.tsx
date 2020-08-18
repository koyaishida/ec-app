import React, { useCallback,useState } from "react"
import {createStyles, makeStyles,Theme} from "@material-ui/core/styles"
import {AppBar, Toolbar} from "@material-ui/core"
import logo from "../../assets/img/icons/logo.png"
import {useSelector,useDispatch} from "react-redux"
import {getIsSignedIn} from "../../reducks/users/selectors"
import {push} from "connected-react-router"
import HeaderMenus from "./HeaderMenus"
import ClosableDrawer from "./ClosableDrawer"

const useStyles = makeStyles((theme:Theme) => 
createStyles({
  root : {
    flexGrow: 1
  },
  menuBar: {
    backgroundColor: "#fff",
    color : "#444"
  },
  toolBar : {
    margin : "0 auto",
    maxWidth: 1024,
    width: "100%"
  },
  iconButtons: {
    margin : "0 0 0 auto"
  },
}))

const Header = () =>{
  
 const classes = useStyles()
 const selector =  useSelector(state => state) 
 const isSignedIn =getIsSignedIn(selector)
 const dispatch = useDispatch()

 const [open, setOpen] = useState(false)

 const handleDrawerToggle = useCallback((event)=>{
   if (event.type === "keydown" &&(event.key === "Tab" || "Shift")){
     return
   }setOpen(!open)
 },[setOpen,open])

 
 return (
  <div className="root">
    <AppBar position="fixed" className={classes.menuBar}>
      <Toolbar className={classes.toolBar}>
        <img src={logo} alt="logo" width="128px" onClick={()=>dispatch(push("/"))}/>
        {isSignedIn && (
          <div className={classes.iconButtons}>
            <HeaderMenus handleDrawerToggle={handleDrawerToggle}/>
          </div>
        )}
      </Toolbar>
    </AppBar>
    <ClosableDrawer open={open} onClose={handleDrawerToggle}/>
  </div>
 )
}

export default Header