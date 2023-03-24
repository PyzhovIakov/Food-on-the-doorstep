import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'

export default function OrderCard(props) {
    const [formOrderCard, setFormOrderCard] = useState({ status: '', datetime: '', cost: 0 })

    const handleChange = (event) => {
        setFormOrderCard({ ...formOrderCard, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        const datetimeDB = props.order.dateDelivery.split('.')
        let price = 0
        props.order.listProducts.map((productAndCount) => price = price + (productAndCount.product.price * productAndCount.count))
        setFormOrderCard(f => ({ ...f, cost: price }))
        setFormOrderCard(f => ({ ...f, status: props.order.status }))
        setFormOrderCard(f => ({ ...f, datetime: datetimeDB[0] }))
    }, [props.order])

    return (
        <Stack
            key={props.index}
            direction="row"
            justifyContent="space-between"
            sx={{ boxShadow: 5, marginTop: '10px' }}
        >
            <h3 style={{ minWidth: '20%' }}>{props.order.fullname}</h3>
            <Stack direction="row" spacing={2} sx={{ marginLeft: '10px' }}>
                <FormControl variant="standard" sx={{ minWidth: '160px' }}>
                    <InputLabel id="demo-simple-select-label">Статус</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={formOrderCard.status}
                        label="Статус"
                        onChange={handleChange}
                        name="status"
                    >
                        <MenuItem value={'Новый'}>Новый</MenuItem>
                        <MenuItem value={'Передан на кухню'}>Передан на кухню</MenuItem>
                        <MenuItem value={'Доставка'}>Доставка</MenuItem>
                        <MenuItem value={'Завершен'}>Завершен</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    name="datetime"
                    variant="standard"
                    label="Дата доставки"
                    type="datetime-local"
                    onChange={handleChange}
                    value={formOrderCard.datetime}
                />
                <h4 style={{ margin: 'auto 5px' }}>Сумма заказа:{formOrderCard.cost}р</h4>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ marginRight: '10px' }}>
                <Button onClick={() => props.saveChanges(props.order._id, formOrderCard)} size="small" variant="contained" color="success" sx={{ borderRadius: '15px' }}>Сохранить</Button>
                <Button variant="contained" color="success" sx={{ borderRadius: '50%', m: 0, p: '10px', minWidth: 0 }}>
                    <SearchIcon />
                </Button>
                <Button variant="contained" color="success" sx={{ borderRadius: '50%', m: 0, p: '10px', minWidth: 0 }}>
                    <DeleteIcon />
                </Button>
            </Stack>
        </Stack>
    )
}