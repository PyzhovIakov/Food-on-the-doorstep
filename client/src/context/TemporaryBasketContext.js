import { createContext } from 'react'

function noop() { }

const TemporaryBasketContext = createContext({
    basket: [],
    AddBasket: noop,
    DeleteBasket: noop,
    DecrementBasket: noop,
    IncrementBasket: noop,
    UpdateUserBasket: noop
})

export default TemporaryBasketContext