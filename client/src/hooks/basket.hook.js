import {useState,useCallback,useEffect,useContext} from 'react'
import useHttp from './http.hook'
import AuthContext from './../context/AuthContext'

const StorageName = 'BasketData'

const useBasket = () => {
    const {request} = useHttp()
    const ContextAuth = useContext(AuthContext)
    const [basket, setBasket] = useState([])

    const AddBasket = (product) => {
        let FlagUpdate=false
        for(let i=0;i<basket.length;i++){
            if(basket[i].product._id===product._id){
                let prevBasket = basket
                prevBasket[i].count += 1
                setBasket(prevBasket)
                localStorage.setItem(StorageName,JSON.stringify({basket:basket}))
                FlagUpdate=true
            }
        }
        if(!FlagUpdate){
            setBasket((prevBasket)=>[...prevBasket, {product:product, count:1}])
            localStorage.setItem(StorageName,JSON.stringify({basket:basket}))
        }
    }

    const DecrementBasket = (product) => {
        for(let i=0;i<basket.length;i++){
            if(basket[i].product._id===product._id){
                let prevBasket = basket
                prevBasket[i].count -= 1
                setBasket(prevBasket)
                localStorage.setItem(StorageName,JSON.stringify({basket:basket}))
            }
        }
    }
    
    const IncrementBasket = (product) => {
        for(let i=0;i<basket.length;i++){
            if(basket[i].product._id===product._id){
                let prevBasket = basket
                prevBasket[i].count += 1
                setBasket(prevBasket)
                localStorage.setItem(StorageName,JSON.stringify({basket:basket}))
            }
        }
    }
    
    const DeleteBasket = useCallback(()=>{
        setBasket([])
        localStorage.removeItem(StorageName)
    }, [])

    const UpdateUserBasket = async() =>{
        try{
            if(ContextAuth.userId!==null){
                await request(`/basket/${ContextAuth.userId}`,'PATCH',{basket:basket})
            }
        }catch(e){console.log('useBasket UpdateUserBasket',e)}
       
    }

   useEffect(()=>{
        if(ContextAuth.userId!==null){
            (async function(){
                const  data = await request(`/auth/${ContextAuth.userId}`,'GET')
                const newbasket = basket.concat(data.basket)
                setBasket(newbasket)
            }())
            localStorage.setItem(StorageName,JSON.stringify({basket:basket}))         
        }
        else{
            const data  = JSON.parse(localStorage.getItem(StorageName))
            if(data && data.basket){
                const newbasket = basket.concat(data.basket)
                setBasket(newbasket)
            }
        }
        
    },[])


    return{basket,AddBasket,DeleteBasket,DecrementBasket,IncrementBasket,UpdateUserBasket}
}
export default useBasket