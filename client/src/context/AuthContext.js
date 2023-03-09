import {createContext} from 'react'

function noop(){}

const AuthContext = createContext({
    token:null,
    userId:null,
    role:null,
    login:noop,
    logout:noop,
    userBasket:[],
    updateUserBasket:noop,
    isAuth:false
})

export default AuthContext