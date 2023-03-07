import React,{useState,useEffect} from 'react'
import useHttp from './../../hooks/http.hook.js'
import Alert from '@mui/material/Alert';
import OrdersTape from './../../Component/OrdersTape/OrdersTape'

export default function Orders() {
    const {loading,request,error,ClearError} = useHttp()
    const [orders, setOrders] = useState([])
    
    useEffect(()=>{
        async function Fetchdata(){
          const data =await request('/order','GET')
          setOrders(data)
        }
        Fetchdata()
    },[request])

    return (
        <div>
            <h1>Заказы</h1>
            {error?<Alert severity="error" onClose={() => {ClearError()}}>{error}</Alert>:null}
            {loading?null:<OrdersTape orders={orders}/>}
        </div>
    );
}