import React, { useEffect, useState } from 'react'
import Banner from './../../Component/Banner/Banner'
import QuestionAnswer from './../../Component/QuestionAnswer/QuestionAnswer'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import useHttp from './../../hooks/http.hook.js'

export default function Home() {
    const { loading, request, error, message, ClearError, ClearMessage } = useHttp()
    const [banner, setBanner] = useState([])
    const [questionAnswer, setQuestionAnswer] = useState([])

    useEffect(() => {
        (async function () {
            try {
                const dataBanner = await request('/site/banner', 'GET')
                setBanner(dataBanner.value)
                console.log('dataBanner.value',dataBanner.value)
                const dataQuestionAnswer = await request('/site/questionAnswer', 'GET')
                setQuestionAnswer(dataQuestionAnswer.value)
                console.log('dataQuestionAnswer.value',dataQuestionAnswer.value)
            } catch (e) { console.log('Profile useEffect', e) }
        }())
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
                        <Banner banner={banner} />
                        <QuestionAnswer listQuestionsAnswers={questionAnswer} />
                    </>
            }

        </div>
    );
}