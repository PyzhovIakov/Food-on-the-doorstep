import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function QuestionAnswer(props) {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <div style={{ width: '90%', margin: '30px auto' }}>
            {
                props.listQuestionsAnswers.map((QA, index) => (
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