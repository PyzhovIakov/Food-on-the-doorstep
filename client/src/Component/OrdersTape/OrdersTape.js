import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
//import Button from '@mui/material/Button'

export default function OrdersTape(props) {

    return(
        <Box sx={{ width:'95%', marginLeft:'auto',marginRight:'auto'}}>
            {
                props.orders.length!==0?props.orders.map((order,index)=>(
                    <Stack 
                        key={index} 
                        direction="row" 
                        justifyContent="space-around"
                        sx={{boxShadow:3, marginTop:'20px'}}
                    >
                            <h2>{order.fullname}</h2>
                            <h2>{order.status}</h2>
                    </Stack>
                )):null
            }
            
        </Box>
    );
}