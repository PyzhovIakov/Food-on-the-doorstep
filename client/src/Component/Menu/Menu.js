import React,{useContext, useEffect, useState} from 'react';
import Stack from '@mui/material/Stack'
import {Link} from "react-router-dom"
import Button from '@mui/material/Button'
import AuthContext from './../../context/AuthContext'
import MenuUserRoleController from './MenuUserRoleController'

function Menu() {
    const auth = useContext(AuthContext)
    const [Links, setLinks] = useState([])
    
    useEffect(()=>{
        setLinks(MenuUserRoleController(auth.role))
    },[auth.role])

    return(
            <Stack
                sx={{
                    width: '100%',
                    boxShadow: 3,
                    height:'70px'
                }}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={3}
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
    );
}
export default Menu;