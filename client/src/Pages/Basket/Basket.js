import React,{useContext,useState, useEffect,useCallback} from 'react'
import AuthContext from './../../context/AuthContext'
import TemporaryBasketContext from './../../context/TemporaryBasketContext'
import useHttp from './../../hooks/http.hook'
import Alert from '@mui/material/Alert';
import TapeBasket from './../../Component/TapeBasket/TapeBasket'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import CheckoutDialog from './../../Component/CheckoutDialog/CheckoutDialog'


export default function Basket() {
    const {loading,request,error,ClearError} = useHttp()
    const ContextAuth = useContext(AuthContext)
    const BasketContext = useContext(TemporaryBasketContext)
    const [product, setProduct] = useState([])
    const [productListId, setProductListId] = useState([])
    const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
    const [message, setMessage] = useState(null)
    const [errors, setErrors] = useState(null)


    const FetchBasketUnauthorizedUser = useCallback(async()=>{
        try{
            let listProduct = []
            for(let i=0;i<BasketContext.basket.length;i++){
                const data = await request(`/catalog/${BasketContext.basket[i]}`,'GET')
                if(data.errors){setErrors(data.errors)}
                listProduct.push(data)
            }
            setProduct(listProduct)
        }catch(e){console.log('Basket FetchBasketUnauthorizedUser', e)}    
    },[request, BasketContext.basket])

    const FetchBasketAuthorizedUser = useCallback(async()=>{
        try{
            const  data = await request(`/auth/${ContextAuth.userId}`,'GET')
            if(data.errors){setErrors(data.errors)}
            setProduct(data.basket)
            for(let i=0;i<data.basket.length;i++){
                setProductListId((prev)=>[...prev,data.basket[i]._id])
            }
        }catch(e){console.log('Basket FetchBasketAuthorizedUser', e)}    
    },[request,ContextAuth.userId])

    useEffect(()=>{
        ContextAuth.CheckingAuthorizedUser()
        if(!!ContextAuth.userId){
            FetchBasketAuthorizedUser()
        }else{
            FetchBasketUnauthorizedUser()
        }
      },[ContextAuth.userId])


    const CheckoutUser = async() =>{
        try{
            
            if(productListId.length===0 && BasketContext.basket.length===0){return;}
            if(!!ContextAuth.userId){
                const data = await request('/order', 'POST',
                    {
                        userId:ContextAuth.userId,
                        listProducts:productListId,
                    }
                )
                if(data.errors){setErrors(data.errors)}
                if(data.message){setMessage(data.message)}
                setProduct([])
                setProductListId([])
                ContextAuth.updateUserBasket(ContextAuth.userId)
            }
            else{
                setOpenCheckoutDialog(true);
            }
            
         }catch(e){console.log('Basket CheckoutUser', e)}
    }

    return (
        <div>
            <Stack direction="row" justifyContent="space-around"  alignItems="center" sx={{margin:'15px 0'}}>
                <h1>Корзина</h1>
                <Button variant="contained" color="success" sx={{borderRadius:'15px'}} onClick={CheckoutUser}>
                    Оформить заказ 
                </Button>
            </Stack>
            <CheckoutDialog 
                setErrors={setErrors}
                setMessage={setMessage}
                open={openCheckoutDialog} 
                setOpen={setOpenCheckoutDialog}
                setProduct={setProduct}
            />
            {error?<Alert severity="error" onClose={() => {ClearError()}}>{error}</Alert>:null}
            {errors?<Alert severity="warning" onClose={() => {setErrors(null)}}>{errors}</Alert>:null}
            {message?<Alert severity="info" onClose={() => {setMessage(null)}}>{message}</Alert>:null}
            {loading?'loading':<TapeBasket productInBasket={product}/>}          
        </div>
    );
}