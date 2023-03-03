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
    const [openCheckoutDialog, setOpenCheckoutDialog] = React.useState(false);

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
        for(let i=0;i<data.basket.length;i++){
            setProductListId((prev)=>[...prev,data.basket[i]._id])
        }
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
            if(productListId.length===0){return;}
            if(!!ContextAuth.userId){
                await request(
                    '/order',
                        'POST',
                        {
                        userId:ContextAuth.userId,
                        listProducts:productListId,
                    }
                        )

                setProduct([])
                setProductListId([])
            }
            else{
                setOpenCheckoutDialog(true);
            }
            
         }catch(e){}
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
                open={openCheckoutDialog} 
                setOpen={setOpenCheckoutDialog}
                setProduct={setProduct}
            />
            {error?<Alert severity="error" onClose={() => {ClearError()}}>{error}</Alert>:null}
            {loading?'loading':<TapeBasket productInBasket={product}/>}          
        </div>
    );
}