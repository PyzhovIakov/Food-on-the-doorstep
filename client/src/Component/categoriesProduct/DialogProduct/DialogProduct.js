import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import logo from './../../../Image/logo.png'

export default function DialogProduct(props) {

  const handleClose = () => {
    props.setOpen(false);
  };

  const AddProductinBaset = () => {
      props.clickBuyProduct(props.product._id) 
      props.setOpen(false)
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>
          <Stack  direction="row"  justifyContent="space-between" alignItems="center">
            {props.product.name}
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack  direction="row">
            <img 
              src={props.product.imageUrl?'http://localhost:5000'+props.product.imageUrl:logo} 
              height={'200px'}
              style={{borderRadius:'15px'}} 
              alt={props.product.name}
            />
            <div>
              <DialogContentText>Название:{props.product.name}</DialogContentText>
              <DialogContentText>Категория:{props.product.category}</DialogContentText>
              <DialogContentText>Вес:{props.product.weight}</DialogContentText>
              <DialogContentText>Цена:{props.product.price}р</DialogContentText>
            </div>
          </Stack>
          <DialogContentText> 
            {props.product.description}
          </DialogContentText>      
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={AddProductinBaset}>Купить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}