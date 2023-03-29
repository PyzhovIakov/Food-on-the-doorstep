import React, { useEffect, useState, useContext } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import useHttp from './../../hooks/http.hook.js'
import AuthContext from './../../context/AuthContext'
import Banner from './../../Component/Banner/Banner'
import QuestionAnswer from './../../Component/QuestionAnswer/QuestionAnswer'
import DialogBanner from './../../Component/Banner/DialogBanner/DialogBanner'

export default function Home() {
    const { loading, request, error, message, ClearError, ClearMessage } = useHttp()
    const ContextAuth = useContext(AuthContext)
    const [banner, setBanner] = useState([])
    const [questionAnswer, setQuestionAnswer] = useState([])
    const [openDialogBanner, seOpenDialogBanner] = useState(false)

    const fetchDataHome = async () => {
        try {
            const dataBanner = await request('/site/banner', 'GET')
            setBanner(dataBanner.value)
            console.log('dataBanner.value', dataBanner.value)
            const dataQuestionAnswer = await request('/site/questionAnswer', 'GET')
            setQuestionAnswer(dataQuestionAnswer.value)
            console.log('dataQuestionAnswer.value', dataQuestionAnswer.value)
        } catch (e) { console.log('Profile useEffect', e) }
    }

    useEffect(() => {
        fetchDataHome()
    }, [])


    if (error) { setTimeout(() => ClearError(), 6000) }
    if (message) { setTimeout(() => ClearMessage(), 6000) }

    return (
        <div>
            {error ? <Alert severity="warning" onClose={ClearError}>{error}</Alert> : null}
            {message ? <Alert severity="info" onClose={ClearMessage}>{message}</Alert> : null}

            {
                loading ?
                    <LinearProgress color="success" /> :
                    <>
                        {
                            ContextAuth.role === 'admin' ?
                                <>
                                    <Button onClick={() => seOpenDialogBanner(true)} variant="contained" color="success" sx={{ borderRadius: '15px', m: '20px 5px' }} startIcon={<AddIcon />}>
                                        Добавить изображений в баннер
                                    </Button>
                                    <DialogBanner
                                        banner={banner}
                                        open={openDialogBanner}
                                        setOpen={seOpenDialogBanner}
                                    />
                                </>
                                : null
                        }
                        <Banner banner={banner} />
                        <QuestionAnswer listQuestionsAnswers={questionAnswer} />
                    </>
            }

        </div>
    );
}