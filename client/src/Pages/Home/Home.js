import React, { useEffect, useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import useHttp from './../../hooks/http.hook.js'
import Banner from './../../Component/Banner/Banner'
import QuestionAnswer from './../../Component/QuestionAnswer/QuestionAnswer'

export default function Home() {
    const { loading, request, error, message, ClearError, ClearMessage } = useHttp()
    const [banner, setBanner] = useState([])
    const [questionAnswer, setQuestionAnswer] = useState([])

    const fetchDataHome = async () => {
        try {
            const dataBanner = await request('/site/banner', 'GET')
            setBanner(dataBanner.value)
            const dataQuestionAnswer = await request('/site/questionAnswer', 'GET')
            setQuestionAnswer(dataQuestionAnswer.value)
        } catch (e) { console.log('Home fetchDataHome', e) }
    }

    const addImagesBanner = async (img) => {
        try {
            if (img) {
                setBanner([...banner, img])
                await request('/site/banner', 'PATCH', { value: [...banner, img] })
            }
        } catch (e) { console.log('Home deleteAndAddImagesBanner', e) }
    }

    const deleteImagesBanner = async (img) => {
        try {
            if (img && banner.length > 1) {
                setBanner(banner.filter(item => item !== img))
                await request('/site/banner', 'PATCH', { value: banner.filter(item => item !== img) })
            }
        } catch (e) { console.log('Home deleteAndAddImagesBanner', e) }

    }

    const deleteQuestionAnswer = async (QA) => {
        try {
            if (QA && questionAnswer.length > 1) {
                setQuestionAnswer(questionAnswer.filter(item => item.question !== QA.question))
                await request('/site/questionAnswer', 'PATCH', { value: questionAnswer.filter(item => item.question !== QA.question) })
            }
        } catch (e) { console.log('Home deleteQuestionAnswer', e) }
    }

    const addQuestionAnswer = async (item) => {
        try {
            if (item && item.question !== '' && item.answer !== '') {
                setQuestionAnswer([...questionAnswer, item])
                await request('/site/questionAnswer', 'PATCH', { value: [...questionAnswer, item] })
            }
        } catch (e) { console.log('Home addQuestionAnswer', e) }
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
                        <Banner banner={banner} deleteImagesBanner={deleteImagesBanner} addImagesBanner={addImagesBanner} />
                        <QuestionAnswer addQuestionAnswer={addQuestionAnswer} deleteQuestionAnswer={deleteQuestionAnswer} listQuestionsAnswers={questionAnswer} />
                    </>
            }

        </div>
    );
}