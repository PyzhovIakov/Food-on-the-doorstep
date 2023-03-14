import React,{useContext, useState} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import logo from './../../../Image/logo.png'
import Stack from '@mui/material/Stack'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import DangerousIcon from '@mui/icons-material/Dangerous'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import AuthContext from './../../../context/AuthContext'
import TemporaryBasketContext from './../../../context/TemporaryBasketContext.js'
import useHttp from './../../../hooks/http.hook'
import DialogProduct from './../DialogProduct/DialogProduct'

export default function ProductCard(props) {
    const {request} = useHttp()
    const ContextAuth = useContext(AuthContext)
    const BasketContext = useContext(TemporaryBasketContext)
    const [openDialogProduct , seOpenDialogProduct] = useState(false)

    const AddProductinBaset = async(id)=>{
      try{
        if(ContextAuth.userId!==null){
          const data = await request(`/basket/${ContextAuth.userId}`,'PATCH',{basket:id})
          if(data.errors){props.setErrors(data.errors)}
          if(data.message){props.setMessage(data.message)}
          ContextAuth.updateUserBasket(ContextAuth.userId)
        }
        else{
          const data = BasketContext.AddBasket(id)
          if(data.errors){props.setErrors(data.errors)}
          if(data.message){props.setMessage(data.message)}
        }
      }catch(e){console.log('ProductCard AddProductinBaset', e)}  
    }

    return(
      <>
        <DialogProduct 
          product={props.product}
          open={openDialogProduct} 
          setOpen={seOpenDialogProduct}
          clickBuyProduct={AddProductinBaset}
        />
        <Box key={props.index} sx={{ width: 250, height: 260, marginLeft:'5px',marginRight:'5px',borderRadius:'15px' ,boxShadow:3}}>
            <img src={props.product.imageUrl?'http://localhost:5000'+props.product.imageUrl:logo} width={'100%'} style={{borderRadius:'15px',maxHeight:'60%'}} alt={props.product.name}/>
            <h3 style={{padding:0,margin:'0 15px'}}>{props.product.name}</h3>
            <h3 style={{padding:0,margin:'0 15px'}}>Цена: {props.product.price}p</h3>
            <Stack direction="row"  justifyContent="space-around">
              {
                ContextAuth.role==='manager'?(
                  <>
                    <Button variant="contained" color="success" sx={{borderRadius:'50%', m:0,p:'10px', minWidth:0}}>
                      {props.product.isStopped? <DangerousIcon/>:<TaskAltIcon/>}
                    </Button>
                    <Button variant="contained" color="success" sx={{borderRadius:'50%', m:0,p:'10px', minWidth:0}}>
                      <EditIcon/>
                    </Button>
                    <Button variant="contained" color="success" sx={{borderRadius:'50%', m:0,p:'10px', minWidth:0}}>
                      <DeleteIcon/>
                    </Button>
                </>
                ):null
              }
              {
                (ContextAuth.role==='user' || ContextAuth.role===null)?(
                  <Button variant="contained" disabled={props.product.isStopped} onClick={()=>AddProductinBaset(props.product._id)} color="success" sx={{borderRadius:'15px'}} startIcon={<AddShoppingCartIcon/>}>
                    Купить
                  </Button>
                ):null
              }
                <Button variant="contained" color="success" sx={{borderRadius:'50%', m:0,p:'10px', minWidth:0}} onClick={()=>seOpenDialogProduct(true)}>
                    <SearchIcon/>
                </Button>
            </Stack>  
        </Box>
      </>
    )
}