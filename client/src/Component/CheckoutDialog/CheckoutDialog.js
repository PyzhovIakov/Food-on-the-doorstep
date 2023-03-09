import React, {useState,useContext}from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TemporaryBasketContext from './../../context/TemporaryBasketContext'
import useHttp from './../../hooks/http.hook'

export default function CheckoutDialog(props) {
    const {request} = useHttp()
    const [form, setForm] = useState('')
    const BasketContext = useContext(TemporaryBasketContext)

    const ChangeHandler= event=>{
        setForm(event.target.value)
    }
    const handleClose = () => {
        props.setOpen(false);
    };

    const CheckoutUser = async() =>{
      try{
        const data = await request(
          '/order', 
          'POST',
          {
              listProducts:BasketContext.basket,
              fullname:form
          }
      )
      if(data.errors){props.setErrors(data.errors)}
      if(data.message){props.setMessage(data.message)}
      props.setProduct([])
      BasketContext.DeleteBasket()
      props.setOpen(false);
      }catch(e){console.log('CheckoutDialog CheckoutUser',e)}  
    }


  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText> 
            Введите ФИО получателя.
          </DialogContentText>
          <TextField
            onChange={ChangeHandler}
            autoFocus
            margin="dense"
            id="fullname"
            label="ФИО"
            type="text"
            fullWidth
            variant="standard"
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