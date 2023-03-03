import React,{useContext,useState, useEffect,useCallback} from 'react'
import AuthContext from './../../context/AuthContext'
import TemporaryBasketContext from './../../context/TemporaryBasketContext'
import useHttp from './../../hooks/http.hook'
import Alert from '@mui/material/Alert';
import TapeBasket from './../../Component/TapeBasket/TapeBasket'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export default function Basket() {
    const {loading,request,error,ClearError} = useHttp()
    const ContextAuth = useContext(AuthContext)
    const BasketContext = useContext(TemporaryBasketContext)
    const [product, setProduct] = useState([])

    const FetchBasketUnauthorizedUser=useCallback(async()=>{
        let listProduct = []
        for(let i=0;i<BasketContext.basket.length;i++){
            const data = await request(`/catalog/${BasketContext.basket[i]}`,'GET')
            listProduct.push(data)
        }
        setProduct(listProduct)
    },[request, BasketContext.basket])

    const FetchBasketAuthorizedUser=useCallback(async()=>{
        const  data = await request(`/auth/${ContextAuth.userId}`,'GET')
        setProduct(data.basket)
    },[request,ContextAuth.userId])

    useEffect(()=>{
        ContextAuth.CheckingAuthorizedUser()
        if(!!ContextAuth.userId){
            FetchBasketAuthorizedUser()
        }else{
            FetchBasketUnauthorizedUser()
        }
      },[ContextAuth.userId])

    return (
        <div>
            <Stack direction="row" justifyContent="space-around"  alignItems="center" sx={{margin:'15px 0'}}>
                <h1>Корзина</h1>
                <Button variant="contained" color="success" sx={{borderRadius:'15px'}} >
                    Оформить заказ 
                </Button>
            </Stack>
            {error?<Alert severity="error" onClose={() => {ClearError()}}>{error}</Alert>:null}
            {loading?'loading':<TapeBasket productInBasket={product}/>}          
        </div>
    );
}