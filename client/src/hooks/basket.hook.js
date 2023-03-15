import {useState,useCallback,useEffect} from 'react'
const StorageName = 'BasketData'

const useBasket = () => {
    const [basket, setBasket] = useState([])

    const AddBasket = (id) => {
       let FlagAdd=false
        for(let i=0;i<basket.length;i++){
            if(basket[i].id===id){
                let prevBasket = basket
                prevBasket[i].count += 1
                setBasket(prevBasket)
                localStorage.setItem(StorageName,JSON.stringify({basket:basket}))
                FlagAdd=true
                return{message:"Такой товар уже в корзине"}
            }
        }
        if(!FlagAdd){
            setBasket((prevBasket)=>[...prevBasket, {id:id, count:1}])
            localStorage.setItem(StorageName,JSON.stringify({basket:basket}))
            return {message:"Товар добавлен в корзину"}
        }
    }

    const DecrementBasket = (id) => {
         for(let i=0;i<basket.length;i++){
             if(basket[i].id===id){
                let prevBasket = basket
                prevBasket[i].count -= 1
                setBasket(prevBasket)
                localStorage.setItem(StorageName,JSON.stringify({basket:basket}))
                return{message:"Такой товар уже в корзине"}
             }
         }
     }
    
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


    return{basket,AddBasket,DeleteBasket,DecrementBasket}
}
export default useBasket