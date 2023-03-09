import React,{useContext, useEffect, useState} from 'react';
import Stack from '@mui/material/Stack'
import {Link} from "react-router-dom"
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout'
import Badge from '@mui/material/Badge'
import AuthContext from './../../context/AuthContext'
import TemporaryBasketContext from './../../context/TemporaryBasketContext'
import MenuUserRoleController from './MenuUserRoleController'
import logo from './../../Image/logo.png'

function Menu() {
    const auth = useContext(AuthContext)
    const basketContext = useContext(TemporaryBasketContext)
    const [Links, setLinks] = useState([])

    useEffect(()=>{
        if(auth.userId!==null){ auth.updateUserBasket(auth.userId)}
        setLinks(MenuUserRoleController(auth.role))
    },[auth.role,auth.userId])

    return(
        <Stack
            sx={{ width: '100%', boxShadow: 3, height:'70px'}}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
        >
            <div style={{ margin:5,padding:5, height:'60px', borderRadius:'5px'}}>
                <Link to={'/'} >
                    <img src={logo} height={'100%'} style={{borderRadius:'10px'}} alt='Главная'/>
                </Link>
            </div>
            
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={3}
                sx={{margin:'0 8px'}}
            >
                {
                    Links.map((link,index)=>(
                        <Link 
                            to={link.to} 
                            key={index} 
                            style={{margin:'0 8px', textDecoration: 'none'}}
                        >
                            <Button variant="contained" size="large"  color="success">
                                {link.text}
                            </Button>
                        </Link>
                    ))
                }
                {
                    (auth.role!=='manager' || auth.role!=='admin')? 
                        <Link to={'/basket'} style={{margin:'0 8px', textDecoration: 'none'}}>
                            <Badge 
                                color="success" 
                                badgeContent={auth.isAuth?auth.userBasket.length:basketContext.basket.length} 
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <Button variant="contained" size="large" color="success">
                                    Корзина
                                </Button>
                            </Badge>
                        </Link>
                        :null
                }
                {
                    auth.isAuth?
                    <>
                        <Link to={'/profile'} style={{margin:5, textDecoration: 'none'}}>
                            <Button variant="contained" size="large" color="success">Профиль</Button>
                        </Link>
                        <Link to={'/'} style={{margin:5, textDecoration: 'none'}}>
                            <Button variant="contained" size="large" onClick={auth.logout} color="success" endIcon={<LogoutIcon />}>Выход</Button>
                        </Link>
                    </>
                    :null
                }

            </Stack>
        </Stack>
    );
}
export default Menu;