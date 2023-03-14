import React,{useEffect,useState, useContext} from 'react'
import useHttp from './../../hooks/http.hook.js'
import Alert from '@mui/material/Alert'
import AuthContext from './../../context/AuthContext'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import logo from './../../Image/logo.png'
import Avatar from '@mui/material/Avatar'
import CameraAltIcon from '@mui/icons-material/CameraAlt'

export default function Profile() {
    const {loading,request,error,ClearError} = useHttp()
    const ContextAuth = useContext(AuthContext)
    const [message, setMessage] = useState(null)
    const [errors, setErrors] = useState(null)
    const [user, setUser] = useState({})

    useEffect(()=>{
        async function Fetchdata(){
          try
          {
            const  data = await request(`/auth/${ContextAuth.userId}`,'GET')
            setUser(data)
            if(data.errors){setErrors(data.errors)}
            if(data.message){setMessage(data.message)}
          }catch(e){console.log('Profile useEffect Fetchdata', e)}
          
        }
        Fetchdata()
    },[request])


    return (
        <div>
            {error?<Alert severity="error" onClose={() => {ClearError()}}>{error}</Alert>:null}
            {errors?<Alert severity="warning" onClose={() => {setErrors(null)}}>{errors}</Alert>:null}
            {message?<Alert severity="info" onClose={() => {setMessage(null)}}>{message}</Alert>:null}
            {(!loading && user!==null)?(
                <Box sx={{width:'98%', margin:'20px auto'}}>
                    <Stack direction="row"   justifyContent="center"  alignItems="flex-start">
                        <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2} sx={{width:'40%'}}>
                            <Avatar src={logo} sx={{ width:'200px',height:'200px'}}/>
                            <Button 
                                variant="contained" 
                                color="success" 
                                startIcon={<CameraAltIcon size="large"/>}
                                sx={{borderRadius:'15px',width:'200px'}}
                            >
                                Сменить аву
                            </Button>
                            <Button variant="contained" color="success" sx={{borderRadius:'15px',width:'200px'}}>
                                Сменить пароль
                            </Button>
                            <Button variant="contained" color="error" sx={{borderRadius:'15px',width:'200px'}}>
                                Удалить аккаунт
                            </Button>
                        </Stack>
                        <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2}>
                            <h2>{user.fullname}</h2>
                            <h3>{user.email}</h3>
                            <h3>Прошлый адрес доставки:{user.deliveryAddress?user.deliveryAddress:'нет'}</h3>
                        </Stack>
                    </Stack>
                </Box>
            ):null}
        </div>
    );
}