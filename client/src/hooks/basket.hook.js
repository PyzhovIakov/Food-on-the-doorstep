import {useState,useCallback,useEffect} from 'react'
const StorageName = 'BasketData'

const useBasket = () => {
    const [basket, setBasket] = useState([])

    const AddBasket=useCallback((id)=>{
        if(!basket.includes(id)){
            setBasket((prevBasket)=>[...prevBasket, id])
            localStorage.setItem(StorageName,JSON.stringify({basket:basket}))
        }
    },[basket])
    
    const DeleteBasket = useCallback(()=>{
        setBasket([])
        localStorage.removeItem(StorageName)
    }, [])

   useEffect(()=>{
       
        const data  = JSON.parse(localStorage.getItem(StorageName))
        if(data && data.basket){
            setBasket(data.basket)
        }
    },[])


    return{basket,AddBasket,DeleteBasket}
}
export default useBasket