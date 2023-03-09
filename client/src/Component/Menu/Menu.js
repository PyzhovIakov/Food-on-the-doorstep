import React,{useContext, useEffect, useState} from 'react';
import Stack from '@mui/material/Stack'
import {Link} from "react-router-dom"
import Button from '@mui/material/Button'
import AuthContext from './../../context/AuthContext'
import MenuUserRoleController from './MenuUserRoleController'
import logo from './../../Image/logo.png'

function Menu() {
    const auth = useContext(AuthContext)
    const [Links, setLinks] = useState([])
    
    useEffect(()=>{
        setLinks(MenuUserRoleController(auth.role))
    },[auth.role])

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
                sx={{margin:'0 5px'}}
            >
                {
                    Links.map((link,index)=>(
                        <Link 
                            to={link.to} 
                            key={index} 
                            style={{margin:5, textDecoration: 'none',padding:5}}
                        >
                            <Button variant="contained" size="large"  color="success">
                                {link.text}
                            </Button>
                        </Link>
                    ))
                }
                {
                    auth.isAuth?<Button variant="contained" size="large" onClick={auth.logout} color="success">Выйти</Button>:null
                }

            </Stack>
        </Stack>
    );
}
export default Menu;