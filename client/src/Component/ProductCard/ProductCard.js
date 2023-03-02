import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import logo from './../../Image/logo.png'
import Stack from '@mui/material/Stack'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

export default function ProductCard(props) {

    return(
            <Box key={props.index} sx={{ width: 250, height: 260, marginLeft:'5px',marginRight:'5px',borderRadius:'15px' ,boxShadow:3}}>
                <img src={props.product.imageUrl?props.product.imageUrl:logo} width={'100%'} style={{borderRadius:'15px',maxHeight:'60%'}} alt={props.product.name}/>
                <h2 style={{padding:0,margin:'0 15px'}}>{props.product.name}</h2>
                <h3 style={{padding:0,margin:'0 15px'}}>{props.product.price}p</h3>
                <Stack direction="row"  justifyContent="space-around">
                    <Button variant="contained" color="success" sx={{borderRadius:'15px'}} startIcon={<AddShoppingCartIcon/>}>
                        Купить
                    </Button>
                    <Button variant="contained" color="success" sx={{borderRadius:'15px'}}>
                        <SearchIcon/>
                    </Button>
                </Stack>  
            </Box>
    )
}