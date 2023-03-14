import React, {useState,useContext,useEffect}from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TemporaryBasketContext from './../../context/TemporaryBasketContext'
import AuthContext from './../../context/AuthContext'
import useHttp from './../../hooks/http.hook'
import AutocompleteDeliveryAddress from './../AutocompleteDeliveryAddress/AutocompleteDeliveryAddress'

export default function CheckoutDialog(props) {
    const {request} = useHttp()
    const [fullname, setfullname] = useState('')
    const [deliveryAddress, setDeliveryAddress] = useState('')
    const BasketContext = useContext(TemporaryBasketContext)
    const ContextAuth = useContext(AuthContext)

    useEffect(()=>{
      try{
        async function Fetchdata(){
          const  data = await request(`/auth/${ContextAuth.userId}`,'GET')
          setfullname(data.fullname)
          if(data.errors){ props.setErrors(data.errors)}
          if(data.message){ props.setMessage(data.message)}
        }
        if(!!ContextAuth.userId){Fetchdata()}
      }catch(e){console.log('CheckoutDialog useEffect',e)}
    },[request])

    const ChangeHandler= event=>{
      setfullname(event.target.value)
    }

    const handleClose = () => {
        props.setOpen(false);
    }

    const CheckoutUser = async() =>{
      try{
        if(!!ContextAuth.userId){
          const data = await request('/order', 'POST',
              {
                  userId:ContextAuth.userId,
                  listProducts:props.productListId,
                  deliveryAddress:deliveryAddress
              }
          )
          if(data.errors){props.setErrors(data.errors)}
          if(data.message){props.setMessage(data.message)}
          props.setProduct([])
          props.setProductListId([])
          ContextAuth.updateUserBasket(ContextAuth.userId)
        }
        else{
          const data = await request(
            '/order', 
            'POST',
            {
                listProducts:BasketContext.basket,
                fullname:fullname,
                deliveryAddress:deliveryAddress
            }
          )
          if(data.errors){props.setErrors(data.errors)}
          if(data.message){props.setMessage(data.message)}
          props.setProduct([])
          BasketContext.DeleteBasket()
        }
        props.setOpen(false);
      }catch(e){console.log('CheckoutDialog CheckoutUser',e)}  
    }


  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} maxWidth={'sm'} fullWidth={true}>
        <DialogTitle>Заказ</DialogTitle>
        <DialogContent>
          <DialogContentText> 
            Введите ФИО получателя.
          </DialogContentText>
          <TextField
            value={fullname}
            onChange={ChangeHandler}
            autoFocus
            margin="dense"
            name="fullname"
            label="ФИО"
            type="text"
            fullWidth
            variant="standard"
          />
          <AutocompleteDeliveryAddress
            setValue={setDeliveryAddress}
            value={deliveryAddress}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={()=>CheckoutUser()}>Оформить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}