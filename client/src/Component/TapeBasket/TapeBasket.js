import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import logo from './../../Image/logo.png'
export default function TapeBasket(props) {
    
    return(
        <Box sx={{ width:'95%', marginLeft:'auto',marginRight:'auto'}}>
            {
                props.productInBasket.length!==0?props.productInBasket.map((product,index)=>(
                    <Stack key={index} direction="row" justifyContent="space-between" sx={{height:'200px', borderRadius:'15px' ,boxShadow:3, marginTop:'10px'}}>
                        <Stack direction="row">
                            <img 
                                src={product.imageUrl?'http://localhost:5000'+product.imageUrl:logo} 
                                height={'100%'}
                                style={{borderRadius:'15px', maxWidth:'55%'}} 
                                alt={product.name}
                            />
                            <Stack direction="column">
                                <Stack direction="row">
                                    <h2 style={{padding:0,margin:'0 15px'}}>{product.name}</h2>
                                    <h3 style={{padding:0,margin:'0 15px'}}>{product.price}p</h3>
                                </Stack>
                                <h4 style={{padding:0,margin:'0 15px'}}>{product.description}</h4>
                            </Stack>
                        </Stack>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{margin:'0 20px'}}>
                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{border:'2px solid',borderColor: 'success.main', borderRadius:'50px'}}>
                                <Button onClick={()=>{props.Increment(product._id)}} variant="contained" color="success" sx={{borderRadius:'50%', m:0,p:'5px', minWidth:0}}>
                                    <AddIcon/>
                                </Button>
                                <h3>{product.count}</h3>
                                <Button onClick={()=>{props.Decrement(product._id)}} variant="contained" color="success" sx={{borderRadius:'50%', m:0,p:'5px', minWidth:0}}>
                                    <HorizontalRuleIcon/>
                                </Button>
                            </Stack>
                            <Button variant="contained" color="success" sx={{borderRadius:'15px'}}>
                                Удалить        
                            </Button>
                        </Stack>
                    </Stack>
                )):null
            }
            
        </Box>
    );
}