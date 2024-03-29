import React, { useContext, useState } from 'react'
import Carousel from './../Сarousel/Сarousel'
import AuthContext from './../../context/AuthContext'
import DialogBanner from './DialogBanner/DialogBanner'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Banner(props) {
    const ContextAuth = useContext(AuthContext)
    const [openDialogBanner, seOpenDialogBanner] = useState(false)

    return (
        <>
            {
                ContextAuth.role === 'admin' ?
                    <>
                        <Button
                            onClick={() => seOpenDialogBanner(true)}
                            variant="contained" color="success"
                            sx={{ borderRadius: '15px', m: '20px 5px' }}
                            startIcon={<AddIcon />}
                        >
                            Добавить изображений в баннер
                        </Button>
                        <DialogBanner
                            addImagesBanner={props.addImagesBanner}
                            banner={props.banner}
                            open={openDialogBanner}
                            setOpen={seOpenDialogBanner}
                        />
                    </>
                    : null
            }
            <div style={{ marginTop: '25px' }}>
                <Carousel cardLength={1200} cardHeight={410} widthContainer={window.innerWidth * 0.98}>
                    {
                        props.banner.map((img, index) => (
                            <Box key={index} sx={{ width: '1200px', height: '400px', marginLeft: '5px', marginRight: '5px', boxShadow: 3, borderRadius: '15px' }} >
                                <img
                                    src={'http://localhost:5000' + img}
                                    width={'100%'}
                                    height={'100%'}
                                    style={{ borderRadius: '15px' }}
                                    alt={img}
                                />
                                {
                                    ContextAuth.role === 'admin' ?
                                        <Button onClick={() => props.deleteImagesBanner(img)} variant="contained" color="success" sx={{ borderRadius: '15px', m: '20px 5px', position: 'relative', top: '-80px', left: '67vw' }} startIcon={<DeleteIcon />}>
                                            Удалить изображение
                                        </Button>
                                        : null
                                }
                            </Box>
                        ))
                    }
                </Carousel>
            </div>
        </>

    );
}