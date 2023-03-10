import React,{useState, useEffect} from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import useHttp from '../../../hooks/http.hook'

export default function OrderCard(props) {
    const {request} = useHttp()
    const [formOrderCard, setFormOrderCard] = useState({status:'', datetime:'', cost:0});
    

    const handleChange = (event) => {
        setFormOrderCard({...formOrderCard, [event.target.name]:event.target.value})
    };
    
    useEffect(()=>{
        const datetimeDB = props.order.dateDelivery.split('.')
        let price =0;
        props.order.listProducts.map((product)=>price+=product.price)
        setFormOrderCard(f=>({...f, cost:price}))
        setFormOrderCard(f=>({...f, status:props.order.status}))
        setFormOrderCard(f=>({...f, datetime:datetimeDB[0]}))
    },[props.order])
    
    const saveChanges = async() =>{
        try{
            const data = await request(
                `/order/${props.order._id}`,
                'PATCH',
                {
                    status:formOrderCard.status,
                    dateDelivery:formOrderCard.datetime,
                }
            )
            if(data.errors){props.setErrors(data.errors)}
            if(data.message){props.setMessage(data.message)}
         }catch(e){console.log('OrderCard saveChanges',e)}
    }

    return(
        <Stack 
            key={props.index} 
            direction="row" 
            justifyContent="space-between"
            sx={{boxShadow:5, marginTop:'10px'}}
        >
            <h3 style={{minWidth:'20%'}}>{props.order.fullname}</h3>
            <Stack direction="row" spacing={2} sx={{marginLeft:'10px'}}>
                <FormControl variant="standard" sx={{minWidth:'160px'}}>
                    <InputLabel id="demo-simple-select-label">????????????</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={formOrderCard.status}
                        label="????????????"
                        onChange={handleChange}
                        name="status"
                    >
                        <MenuItem value={'??????????'}>??????????</MenuItem>
                        <MenuItem value={'?????????????? ???? ??????????'}>?????????????? ???? ??????????</MenuItem>
                        <MenuItem value={'????????????????'}>????????????????</MenuItem>
                        <MenuItem value={'????????????????'}>????????????????</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    name="datetime"
                    variant="standard"
                    label="???????? ????????????????"
                    type="datetime-local"
                    onChange={handleChange}
                    value={formOrderCard.datetime}
                />  
                <h4 style={{margin:'auto 5px'}}>?????????? ????????????:{formOrderCard.cost}??</h4>
            </Stack>
            <Stack direction="row" spacing={2}  alignItems="center" sx={{marginRight:'10px'}}>
                <Button onClick={saveChanges} size="small" variant="contained" color="success" sx={{borderRadius:'15px'}}>??????????????????</Button>
                <Button size="small" variant="contained" color="success" sx={{borderRadius:'15px'}}>??????????????????????</Button>
                <Button size="small" variant="contained" color="success" sx={{borderRadius:'15px'}}>??????????????</Button>
            </Stack>
        </Stack>
    )
}