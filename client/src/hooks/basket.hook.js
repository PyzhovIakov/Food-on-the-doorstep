import {useState} from 'react'

const useBasket = () => {
    const [basket, setBasket] = useState([])

    const AddBasket=(id)=>{
        if(!basket.includes(id)){
            const prevBasket = basket
            prevBasket.push(id)
            setBasket(prevBasket)
        }
    }
    
    return{basket,AddBasket}
}
export default useBasket