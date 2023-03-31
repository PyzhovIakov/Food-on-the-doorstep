import React, { useState, useEffect } from 'react'
import useHttp from './../../hooks/http.hook.js'
import Alert from '@mui/material/Alert'
import LinearProgress from '@mui/material/LinearProgress'
import OrdersTape from './../../Component/OrdersTape/OrdersTape'

export default function Orders() {
    const { loading, request, error, message, ClearError, ClearMessage } = useHttp()
    const [orders, setOrders] = useState([])

    const fetchDataOrders = async () => {
        try {
            const data = await request('/order', 'GET')
            setOrders(data)
        } catch (e) { console.log('Orders fetchDataOrders', e) }
    }

    const DeleteOrder = async (id) => {
        try {
          await request(`/order/${id}`, 'DELETE')
          fetchDataOrders()
        } catch (e) { console.log('Orders DeleteOrder', e) }
    }

    const saveChanges = async (id, formOrderCard) => {
        try {
            await request(
                `/order/${id}`,
                'PATCH',
                {
                    status: formOrderCard.status,
                    dateDelivery: formOrderCard.datetime,
                }
            )
            fetchDataOrders()
        } catch (e) { console.log('Orders saveChanges', e) }
    }

    useEffect(() => {
        fetchDataOrders()
    }, [])


    setInterval(() => { fetchDataOrders() }, 3000000)
    if (error) { setTimeout(() => ClearError(), 6000) }
    if (message) { setTimeout(() => ClearMessage(), 6000) }

    return (
        <div>
            {error ? <Alert severity="warning" onClose={ClearError}>{error}</Alert> : null}
            {message ? <Alert severity="info" onClose={ClearMessage}>{message}</Alert> : null}
            <h1>Заказы</h1>
            {loading ? <LinearProgress color="success" /> : <OrdersTape DeleteOrder={DeleteOrder} saveChanges={saveChanges} orders={orders} />}
        </div>
    );
}