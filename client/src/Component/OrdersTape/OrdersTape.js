import React from 'react'
import Box from '@mui/material/Box'
import OrderCard from './OrderCard/OrderCard'

export default function OrdersTape(props) {

    return (
        <>
            <Box sx={{ width: '98vw', marginLeft: 'auto', marginRight: 'auto' }}>
                {
                    props.orders.length !== 0 ? props.orders.map((order, index) => (
                        <OrderCard DeleteOrder={props.DeleteOrder} saveChanges={props.saveChanges} order={order} key={index} index={index} />
                    )) : null
                }
            </Box>
        </>

    );
}