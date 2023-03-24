import React, { useContext, useState } from 'react'
import TemporaryBasketContext from './../../context/TemporaryBasketContext'
import TapeBasket from './../../Component/TapeBasket/TapeBasket'
import CheckoutDialog from './../../Component/CheckoutDialog/CheckoutDialog'
import useHttp from './../../hooks/http.hook.js'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'

export default function Basket() {
    const { request, error, message, ClearError, ClearMessage } = useHttp()
    const BasketContext = useContext(TemporaryBasketContext)
    const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);

    const CheckoutUser = () => {
        if (BasketContext.basket.length === 0) { return; }
        setOpenCheckoutDialog(true);
    }

    if (error) { setTimeout(() => ClearError(), 6000) }
    if (message) { setTimeout(() => ClearMessage(), 6000) }

    return (
        <div>
            <Stack direction="row" justifyContent="space-around" alignItems="center" sx={{ margin: '15px 0' }}>
                <h1>Корзина</h1>
                <Button variant="contained" color="success" sx={{ borderRadius: '15px' }} onClick={CheckoutUser}>
                    Оформить заказ
                </Button>
            </Stack>
            {error ? <Alert severity="error" onClose={ClearError}>{error}</Alert> : null}
            {message ? <Alert severity="error" onClose={ClearMessage}>{message}</Alert> : null}
            <CheckoutDialog
                request={request}
                open={openCheckoutDialog}
                setOpen={setOpenCheckoutDialog}
            />
            <TapeBasket />
        </div>
    );
}