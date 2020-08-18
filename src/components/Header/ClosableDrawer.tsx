import React ,{useState,useCallback,useEffect, FC} from "react"
import {Drawer,Divider,List,ListItem,ListItemText,ListItemIcon,IconButton,} from "@material-ui/core"
import {makeStyles,Theme,createStyles} from "@material-ui/core/styles"
import {Search,AddCircle,History,Person,ExitToApp} from "@material-ui/icons"
import {TextInput} from "../UIkit"
import {useDispatch} from "react-redux"
import {push} from "connected-react-router"
import {db} from "../../firebase"
import {signOut} from "../../reducks/users/operations"

const useStyles = makeStyles((theme:Theme)=>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]:{
        width : 256,
        flexShrink: 0,
      }
    },
    toolbar:theme.mixins.toolbar,
    drawerPaper : {
      width: 256
    },
    searchField: {
      alignItems: "center",
      display: "flex",
      marginLeft: 32,

    }
  })
)

 type ClosableDrawerProps = {
   open: boolean,
   onClose: ((event: {}) => void)
 }

const ClosableDrawer:FC<ClosableDrawerProps> = (props) =>{

  const classes = useStyles()
  const [keyword,setKeyword] = useState("")
  const dispatch = useDispatch()
  
  

  
  const inputKeyword = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
    setKeyword(event.target.value)
  },[setKeyword])
  
  const selectMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>,path:string)=>{
    dispatch(push(path))
    props.onClose(event)
  }

  type Filter = {
    func:  (event: React.MouseEvent<HTMLDivElement, MouseEvent>,path:string)=>void,
    label: string,
    path: string
  }

  const [filters,setFilters] =useState([
    {func: selectMenu,label: "全て", id:"register", path:"/"},
    {func: selectMenu,label: "家庭用",   id:"home",  path:"/?usage=home"},
    {func: selectMenu,label: "業務用",id:"business",  path:"/?usage=business"}
  ]) 

  

  useEffect(() => {
    db.collection("categories")
    .orderBy("order","asc")
    .get()
      .then((snapshots) => {
        const list:any[] = []
        snapshots.forEach((snapshot)=>{
          const data = snapshot.data()
          list.push({
            func: selectMenu,label: data.name, id: data.id, path:`/?category=${data.id}`,
          })
        })
      setFilters((prevState:any) => [...prevState,...list])
      })
  },[])
  

  const menus = [
    {func: selectMenu,label: "商品登録",   icon:<AddCircle/>,id:"register", path:"/product/edit"},
    {func: selectMenu,label: "注文管理",   icon:<History/>,  id:"history",  path:"/order/history"},
    {func: selectMenu,label: "プロフィール",icon:<Person/>,   id:"profile",  path:"/user/mypage"},
  ]

  return (
    <nav className={classes.drawer}>
      <Drawer 
        variant="temporary" 
        anchor="right" 
        open={props.open}
        onClose={(e)=>props.onClose(e)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
      >
        <div 
          onKeyDown={(e)=>props.onClose(e)}
        >
          <div className={classes.searchField}>
            <TextInput 
              fullWidth={false}
              label={"キーワードを入力"}
              multiline={false}
              onChange={inputKeyword}
              required={false}
              rows={1}
              value={keyword}
              type={"text"}
            />
            <IconButton>
              <Search />
            </IconButton>
          </div>
            <Divider />
              <List>
              {menus.map((menu) =>(
                <ListItem button key={menu.id} onClick={(e)=>menu.func(e,menu.path)}>
                  <ListItemIcon>
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText primary={menu.label}/>
                </ListItem>
              ))}                                                 
                <ListItem button key={"logout"} onClick={()=>dispatch(signOut())}>
                  <ListItemIcon>
                    <ExitToApp />
                    logout
                  </ListItemIcon>
                </ListItem>
              </List>
              <Divider />
              <List>
                {filters.map((filter:Filter,index:number)=>(
                  <ListItem button key={index} onClick={(e)=>filter.func(e,filter.path)}>
                    <ListItemText primary={filter.label}></ListItemText>
                  </ListItem>
                ))}
              </List>
          </div>
      </Drawer>

    </nav>
  )

}

export default ClosableDrawer