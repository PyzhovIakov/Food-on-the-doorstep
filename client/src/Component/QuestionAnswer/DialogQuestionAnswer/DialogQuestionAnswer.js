import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'

export default function DialogQuestionAnswer(props) {
    const [questionAnswer, setQuestionAnswer] = useState({ question: '', title: '', answer: ''})

    const handleClose = () => {
        props.setOpen(false);
    };

    const ChangeHandler = event => {
        setQuestionAnswer({ ...questionAnswer, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth={'md'}>
                <DialogTitle>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        Вопрос-Ответ
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                        <TextField
                            sx={{ m: '5px 0' }}
                            required
                            label="Вопрос"
                            onChange={ChangeHandler}
                            name="question"
                        />
                        <TextField
                            label="Заголовок"
                            onChange={ChangeHandler}
                            name="title"
                        />
                        <TextField
                            required
                            label="Ответ"
                            onChange={ChangeHandler}
                            name="answer"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button   
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{ borderRadius: '15px' }}
                        onClick={() => {
                            props.addQuestionAnswer(questionAnswer)
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