import React from "react"
import {Navigate} from "react-router-dom"
import Profile from "../../Pages/Profile/Profile"
import Basket from "../../Pages/Basket/Basket"
import Contacts from "../../Pages/Сontacts/Сontacts"
import Regis from "../../Pages/Regis/Regis"
import Catalog from "../../Pages/Catalog/Catalog"
import Login from "../../Pages/Login/Login"
import Orders from "../../Pages/Orders/Orders"
import Accounts from "../../Pages/Accounts/Accounts"
import Statistics from "../../Pages/Statistics/Statistics"

const NavigationUserRoleController=(Role) =>{
    if(Role==='user'){
        return([
            {path:'/catalog', element:<Catalog/>, exact:true},
            {path:'/contacts', element:<Contacts/>, exact:true},
            {path:'/basket', element:<Basket/>, exact:true},
            {path:'*', element:<Navigate to="/" replace />, exact:false},
            {path:'/profile', element:<Profile/>, exact:true}
        ]);
    }
    if(Role==='manager'){
        return([
            {path:'/catalog', element:<Catalog/>, exact:true},
            {path:'/contacts', element:<Contacts/>, exact:true},
            {path:'/orders', element:<Orders/>, exact:true},
            {path:'*', element:<Navigate to="/" replace />, exact:false},
            {path:'/profile', element:<Profile/>, exact:true}
        ]);
    }
    if(Role==='admin'){
        return([
            {path:'/catalog', element:<Catalog/>, exact:true},
            {path:'/accounts', element:<Accounts/>, exact:true},
            {path:'/statistics', element:<Statistics/>, exact:true},
            {path:'*', element:<Navigate to="/" replace />, exact:false},
            {path:'/profile', element:<Profile/>, exact:true}
        ]);
    }
    return([
        {path:'/catalog', element:<Catalog/>, exact:true},
        {path:'/contacts', element:<Contacts/>, exact:true},
        {path:'/basket', element:<Basket/>, exact:true},
        {path:'*', element:<Navigate to="/" replace />, exact:false},
        {path:'/login', element:<Login/>, exact:true},
        {path:'/regis', element:<Regis/>, exact:true}
    ]);
}
export default NavigationUserRoleController