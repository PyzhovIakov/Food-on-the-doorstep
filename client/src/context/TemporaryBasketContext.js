import {createContext} from 'react'

function noop(){}

const TemporaryBasketContext = createContext({
    basket:[],
    AddBasket:noop
})

export default TemporaryBasketContext