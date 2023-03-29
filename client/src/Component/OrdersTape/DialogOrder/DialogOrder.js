import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DateAndTimeHandler from './../../../Functions/DateAndTimeHandler'
import logo from './../../../Image/logo.png'
import Carousel from './../../../Component/Сarousel/Сarousel'

export default function DialogOrder(props) {

    const handleClose = () => {
        props.setOpen(false);
    };



    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth={false}>
                <DialogTitle>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        {props.order.fullname}
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <div>
                            <DialogContentText>Клиент:{props.order.fullname}</DialogContentText>
                            <DialogContentText>Дата заказа:{DateAndTimeHandler.dateAndTime(props.order.dateOrder)}</DialogContentText>
                        </div>
                        <div>
                            <DialogContentText>Статус заказа:{props.order.status}</DialogContentText>
                            <DialogContentText>Дата доставки:{DateAndTimeHandler.dateAndTime(props.order.dateDelivery)}</DialogContentText>
                        </div>
                    </Stack>
                    <DialogContentText>Адрес доставки:{props.order.deliveryAddress}</DialogContentText>
                    <Box sx={{ mt: 3 }}>
                        <Carousel cardLength={250} cardHeight={190} widthContainer={window.innerWidth * 0.9}>
                            {
                                props.order.listProducts.map((product, index) => (
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
                                                left: '5px'
                                            }}
                                        />
                                    </Box>
                                ))
                            }
                        </Carousel>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}