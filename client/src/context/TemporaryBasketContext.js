import {createContext} from 'react'

function noop(){}

const TemporaryBasketContext = createContext({
    basket:[],
    AddBasket:noop,
    DeleteBasket:noop,
    DecrementBasket:noop,
})

export default TemporaryBasketContext