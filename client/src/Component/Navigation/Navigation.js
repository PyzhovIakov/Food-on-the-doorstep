import React ,{useContext,useEffect, useState} from "react"
import {BrowserRouter,Route, Routes} from "react-router-dom"
import Home from "../../Pages/Home/Home"
import Menu from "../Menu/Menu";
import AuthContext from './../../context/AuthContext'

import NavigationUserRoleController from './NavigationUserRoleController'

export default function Navigation() {
    const auth = useContext(AuthContext)
    const [pages,setPages] = useState([{path:'/', element:<Home/>, exact:true}])
    
    useEffect(()=>{
        setPages(NavigationUserRoleController(auth.role))
    },[auth.role])

    return (
        <BrowserRouter>
            <Menu/>
            <Routes>
                {
                    pages.map((page)=>(
                        <Route path={page.path} key={page.path} element={page.element} exact={page.exact}/>
                    ))
                }

            </Routes>
        </BrowserRouter>
    );
}