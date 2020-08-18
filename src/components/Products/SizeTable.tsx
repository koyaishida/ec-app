import React, {FC } from  "react"
import {TableContainer,Table,TableBody,TableCell,TableRow,IconButton,} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {ShoppingCart,FavoriteBorder} from "@material-ui/icons"
import {Size } from "../../reducks/products/types"


const useStyles = makeStyles({
  iconCell : {
    height: 48,
    width: 48,
    padding:0,
  }
})

type SizeTableProps = {
  sizes: Size[],
  addProduct:(selectedSize: string) => void
}

const SizeTable:FC<SizeTableProps> = (props) =>{

  const classes = useStyles()
  const sizes = props.sizes

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 && (
            sizes.map((size:Size,index:number) => (
              <TableRow key={index} >
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                <TableCell>
                  残り{size.quantity}点
                </TableCell>
                <TableCell className={classes.iconCell}>
                  {size.quantity > 0 ?(
                    <IconButton>
                      <ShoppingCart onClick={()=>props.addProduct(size.size)}/>
                    </IconButton>
                  ) : (
                    <div>売切れ</div>
                  )}
                </TableCell>
                <TableCell>
                <IconButton>
                      <FavoriteBorder />
                    </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SizeTable