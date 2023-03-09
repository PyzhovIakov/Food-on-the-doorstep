import React,{useState,useEffect} from 'react'
import useHttp from './../../hooks/http.hook.js'
import Alert from '@mui/material/Alert';
import OrdersTape from './../../Component/OrdersTape/OrdersTape'

export default function Orders() {
    const {loading,request,error,ClearError} = useHttp()
    const [orders, setOrders] = useState([])
    const [errors, setErrors] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(()=>{
        async function Fetchdata(){
            try{
                const data =await request('/order','GET')
                setOrders(data)
                if(data.errors){setErrors(data.errors)}
            }catch(e){console.log('Orders useEffect Fetchdata', e)}
        }
        Fetchdata()
    },[request])

    return (
        <div>
            <h1>Заказы</h1>
            {error?<Alert severity="error" onClose={() => {ClearError()}}>{error}</Alert>:null}
            {errors?<Alert severity="warning" onClose={() => {setErrors(null)}}>{errors}</Alert>:null}
            {message?<Alert severity="info" onClose={() => {setMessage(null)}}>{message}</Alert>:null}
            {loading?null:<OrdersTape setMessage={setMessage} setErrors={setErrors} orders={orders}/>}
        </div>
    );
}