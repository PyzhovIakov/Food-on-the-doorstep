import React from 'react'
import Box from '@mui/material/Box'
import OrderCard from './OrderCard/OrderCard'

export default function OrdersTape(props) {
    

    return(
        <Box sx={{ width:'95%', marginLeft:'auto',marginRight:'auto'}}>
            {
                props.orders.length!==0?props.orders.map((order,index)=>(
                    <OrderCard setErrors={props.setErrors} setMessage={props.setMessage} order={order} key={index} index={index} />
                )):null
            }
            
        </Box>
    );
}