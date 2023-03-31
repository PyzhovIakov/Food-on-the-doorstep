import React, { useState, useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import AuthContext from './../../context/AuthContext'
import DialogQuestionAnswer from './DialogQuestionAnswer/DialogQuestionAnswer'

export default function QuestionAnswer(props) {
    const ContextAuth = useContext(AuthContext)
    const [expanded, setExpanded] = useState(false);
    const [openDialogQuestionAnswer, seOpenDialogQuestionAnswer] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <>
            {
                ContextAuth.role === 'admin' ?
                    <>
                        <Button
                            onClick={() => seOpenDialogQuestionAnswer(true)}
                            variant="contained" color="success"
                            sx={{ borderRadius: '15px', m: '20px 5px' }}
                            startIcon={<AddIcon />}
                        >
                            Добавить вопрос-ответ
                        </Button>
                        <DialogQuestionAnswer
                            addQuestionAnswer={props.addQuestionAnswer}
                            open={openDialogQuestionAnswer}
                            setOpen={seOpenDialogQuestionAnswer}
                        />
                    </>
                    : null
            }
            <div style={{ width: '90%', margin: '30px auto' }}>
                {
                    props.listQuestionsAnswers.map((QA, index) => (
                        <Stack key={index} direction="row" alignItems="center" justifyContent="space-between">
                            {
                                ContextAuth.role === 'admin' ?
                                    <Button
                                        onClick={() => props.deleteQuestionAnswer(QA)}
                                        variant="contained"
                                        color="success"
                                        sx={{ borderRadius: '50%', m: 0, p: '10px', minWidth: 0 }}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                    : null
                            }
                            <Accordion  sx={{width: '95%'}} expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h5" sx={{ width: '45%', flexShrink: 0 }}>
                                        {QA.question}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ width: '45%', flexShrink: 0, color: 'text.secondary' }}>
                                        {QA.title}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body1">
                                        {QA.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Stack>

                    ))
                }
            </div>
        </>

    );
}