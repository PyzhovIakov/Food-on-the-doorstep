import React, { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Alert from '@mui/material/Alert'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import Skeleton from '@mui/material/Skeleton'
import logo from './../../../Image/logo.png'
import useUploadImage from './../../../hooks/uploadImage.hook'

export default function DialogBanner(props) {
    const { loading, request, error, ClearError } = useUploadImage()
    const [BannerImg, setBannerImg] = useState(null)
    const imageFile = useRef(null);

    const handleClose = () => {
        props.setOpen(false);
    };

    const ChangeFileImage = async (event) => {
        try {
            const formDate = new FormData()
            const file = event.target.files[0]
            formDate.append('ImagesSite', file)
            const data = await request('/upload/ImagesSite', 'POST', formDate)
            setBannerImg(data.url)
        } catch (e) { console.log('DialogBanner ChangeFileImage', e) }
    }

    if (error) { setTimeout(() => ClearError(), 6000) }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth={false}>
                <DialogTitle>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        Баннер
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    {error ? <Alert severity="error" onClose={ClearError}>{error}</Alert> : null}
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                        {
                            loading ?
                                <Skeleton variant="rounded" width={600} height={200} /> :
                                <img
                                    src={BannerImg ? 'http://localhost:5000' + BannerImg : logo}
                                    height={'200px'}
                                    style={{ borderRadius: '15px' }}
                                    alt={'add img'}
                                />
                        }
                        <div>
                            <p>Рекомендуется расширение картинки 1200*400</p>
                            <input ref={imageFile} onChange={ChangeFileImage} style={{ display: 'none' }} type="file" id="imageUrl" name="imageUrl" accept="image/png, image/jpeg" />
                        </div>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="success"
                        startIcon={<CameraAltIcon size="large" />}
                        sx={{ borderRadius: '15px' }}
                        onClick={() => imageFile.current.click()}
                    >
                        Изменить фото
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ borderRadius: '15px' }}
                        onClick={() => {
                            props.AddImagesBanner(BannerImg)
                            handleClose()
                        }}
                    >
                        Сохранить
                    </Button>
                    <Button variant="outlined" sx={{ borderRadius: '15px' }} onClick={handleClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}