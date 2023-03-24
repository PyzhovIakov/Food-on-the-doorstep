import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const listQuestionsAnswers = [
    { question: 'Почему мы?', title: 'А почему бы и нет', answer: 'Потому что можем.' },
    { question: 'Сколько времени уйдет на приготовление?', title: '30 мин', answer: 'На каждом рецепте указано время его приготовления. В среднем на приготовление блюда потребуется 30 минут. В любом случае весь процесс займет существенно меньше времени, чем вы тратите обычно, и будет куда приятнее.' },
    { question: 'В какие города вы доставляете?', title: 'По России', answer: 'Так как границы России нигде не кончаются, то по всему шарику.' }
]

export default function QuestionAnswer() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <div style={{ width: '90%', margin: '30px auto' }}>
            {
                listQuestionsAnswers.map((QA, index) => (
                    <Accordion key={index} expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h5" sx={{ width: '45%', flexShrink: 0 }}>
                                {QA.question}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>{QA.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1">
                                {QA.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div>
    );
}