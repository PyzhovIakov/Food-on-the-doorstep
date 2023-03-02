import React,{useContext,useState, useEffect,useCallback} from 'react'
//import AuthContext from './../../context/AuthContext'
import TemporaryBasketContext from './../../context/TemporaryBasketContext'
import useHttp from './../../hooks/http.hook'
import Alert from '@mui/material/Alert';
import TapeBasket from './../../Component/TapeBasket/TapeBasket'


export default function Basket() {
    const {request,error,ClearError} = useHttp()
    //const ContextAuth = useContext(AuthContext) loading
    const BasketContext = useContext(TemporaryBasketContext)
    const [product, setProduct] = useState([])

    const Fetchdata=useCallback(async()=>{
        let listProduct = []
        for(let i=0;i<BasketContext.basket.length;i++){
            const data = await request(`/catalog/${BasketContext.basket[i]}`,'GET')
            listProduct.push(data)
        }
        setProduct(listProduct)
    },[request,BasketContext.basket])

    useEffect(()=>{
        Fetchdata()
      },[Fetchdata])

    return (
        <div>
            <h1>Корзина</h1>
            {error?<Alert severity="error" onClose={() => {ClearError()}}>{error}</Alert>:null}
            {<TapeBasket productInBasket={product}/>}          
        </div>
    );
}