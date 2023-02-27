import React from "react"
import {Navigate} from "react-router-dom"
import Profile from "../../Pages/Profile/Profile"
import Basket from "../../Pages/Basket/Basket"
import Contacts from "../../Pages/Сontacts/Сontacts"
import Regis from "../../Pages/Regis/Regis"
import Catalog from "../../Pages/Catalog/Catalog"
import Login from "../../Pages/Login/Login"
import Home from "../../Pages/Home/Home"

const NavigationUserRoleController=(Role) =>{
    if(Role==null){
       return([
            {path:'/', element:<Home/>, exact:true},
            {path:'/catalog', element:<Catalog/>, exact:true},
            {path:'/contacts', element:<Contacts/>, exact:true},
            {path:'/basket', element:<Basket/>, exact:true},
            {path:'*', element:<Navigate to="/" replace />, exact:false},
            {path:'/login', element:<Login/>, exact:true},
            {path:'/regis', element:<Regis/>, exact:true}
        ]);
    }
    if(Role==='user'){
        return([
            {path:'/', element:<Home/>, exact:true},
            {path:'/catalog', element:<Catalog/>, exact:true},
            {path:'/contacts', element:<Contacts/>, exact:true},
            {path:'/basket', element:<Basket/>, exact:true},
            {path:'*', element:<Navigate to="/" replace />, exact:false},
            {path:'/profile', element:<Profile/>, exact:true}
        ]);
    }

}
export default NavigationUserRoleController