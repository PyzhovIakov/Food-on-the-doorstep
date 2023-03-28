import React, { useEffect, useState, useContext } from 'react'
import useHttp from './../../hooks/http.hook.js'
import logo from './../../Image/logo.png'
import AuthContext from './../../context/AuthContext'
import DateAndTimeHandler from './../../Functions/DateAndTimeHandler'
import Carousel from './../../Component/Сarousel/Сarousel'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Alert from '@mui/material/Alert'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import LinearProgress from '@mui/material/LinearProgress'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Chip from '@mui/material/Chip'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box >
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


export default function Profile() {
    const { loading, request, error, message, ClearError, ClearMessage } = useHttp()
    const ContextAuth = useContext(AuthContext)
    const [user, setUser] = useState({})
    const [odrer, setOrder] = useState({})
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        (async function () {
            try {
                const dataUser = await request(`/auth/${ContextAuth.userId}`, 'GET')
                setUser(dataUser)
                const dataOrder = await request(`/order/${ContextAuth.userId}`, 'GET')
                setOrder(dataOrder)
                setOrder(prev => ({ ...prev, dateDelivery: DateAndTimeHandler.dateAndTime(dataOrder.dateDelivery), dateOrder: DateAndTimeHandler.dateAndTime(dataOrder.dateOrder) }))
               
            } catch (e) { console.log('Profile useEffect', e) }
        }())
    }, [request])

    if (error) { setTimeout(() => ClearError(), 6000) }
    if (message) { setTimeout(() => ClearMessage(), 6000) }

    return (
        <div>
            {error ? <Alert severity="warning" onClose={ClearError}>{error}</Alert> : null}
            {message ? <Alert severity="info" onClose={ClearMessage}>{message}</Alert> : null}
            {(!loading && user !== null) ? (
                <Box sx={{ width: '98%', margin: '20px auto' }}>
                    <Stack direction="row" justifyContent="center" alignItems="flex-start">
                        <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2} sx={{ width: '40%' }}>
                            <Avatar src={logo} sx={{ width: '200px', height: '200px' }} />
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<CameraAltIcon size="large" />}
                                sx={{ borderRadius: '15px', width: '200px' }}
                            >
                                Сменить аву
                            </Button>
                            <Button variant="contained" color="success" sx={{ borderRadius: '15px', width: '200px' }}>
                                Сменить пароль
                            </Button>
                            <Button variant="contained" color="error" sx={{ borderRadius: '15px', width: '200px' }}>
                                Удалить аккаунт
                            </Button>
                        </Stack>
                        <Box sx={{ width: '50vw' }}>
                            <AppBar position="static" color="success">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="text.disabled"
                                    textColor="inherit"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab label="Личный данные" {...a11yProps(0)} />
                                    <Tab label="Прошлый заказ" {...a11yProps(1)} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                <Box>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ boxShadow: 3, borderRadius: '20px' }}>
                                        <h4 style={{ margin: '10px 20px' }}>Никнейм</h4>
                                        <h4 style={{ margin: '10px 20px' }}>{user.fullname}</h4>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ boxShadow: 3, borderRadius: '20px' }}>
                                        <h4 style={{ margin: '10px 20px' }}>Email</h4>
                                        <h4 style={{ margin: '10px 20px' }}>{user.email}</h4>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ boxShadow: 3, borderRadius: '20px' }}>
                                        <h4 style={{ margin: '10px 20px' }}>Прошлый адрес доставки</h4>
                                        <h4 style={{ margin: '10px 20px' }}>{user.deliveryAddress ? user.deliveryAddress : 'нет'}</h4>
                                    </Stack>
                                </Box>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ boxShadow: 3, borderRadius: '20px' }}>
                                    <h4 style={{ margin: '10px 20px' }}>Дата заказа</h4>
                                    <h4 style={{ margin: '10px 20px' }}>{odrer.dateOrder}</h4>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ boxShadow: 3, borderRadius: '20px' }}>
                                    <h4 style={{ margin: '10px 20px' }}>Дата доставки</h4>
                                    <h4 style={{ margin: '10px 20px' }}>{odrer.dateDelivery}</h4>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ boxShadow: 3, borderRadius: '20px' }}>
                                    <h4 style={{ margin: '10px 20px' }}>Статус заказа</h4>
                                    <h4 style={{ margin: '10px 20px' }}>{odrer.status}</h4>
                                </Stack>
                                <Box sx={{ mt: 3 }}>
                                    {
                                        odrer.listProducts ?
                                            <Carousel cardLength={250} cardHeight={190} widthContainer={window.innerWidth * 0.5}>
                                                {
                                                    odrer.listProducts.map((product, index) => (
                                                        <Box key={index} sx={{ width: 220, height: 140, marginLeft: '5px', marginRight: '5px', borderRadius: '15px', boxShadow: 3 }}>
                                                            <img
                                                                src={product.product.imageUrl ? 'http://localhost:5000' + product.product.imageUrl : logo}
                                                                width={'100%'}
                                                                height={'100%'}
                                                                style={{ borderRadius: '15px' }}
                                                                alt={product.product.name}
                                                            />
                                                            <Chip
                                                                label={product.count} 
                                                                color="success" 
                                                                sx={{
                                                                    position: 'relative',
                                                                    top: '-40px',
                                                                    left:'5px'
                                                                }} 
                                                            />
                                                        </Box>
                                                    ))
                                                }
                                            </Carousel>
                                            : null
                                    }
                                </Box>
                            </TabPanel>
                        </Box>
                    </Stack>
                </Box>
            ) : <LinearProgress color="success" />}
        </div>
    );
}