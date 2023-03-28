import React, { useState, useEffect, useRef } from 'react'
import './Carousel.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Button from '@mui/material/Button'

function Carousel(props) {
    const { children } = props
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)

    useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (currentIndex < (length - 1)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    return (
        <div className="carousel-container" style={{ width: props.widthContainer + 'px' }}>
            <div className="carousel-wrapper" style={{ height: props.cardHeight + 'px' }}>
                {currentIndex > 0 && (
                    <Button variant="contained" color="success" sx={{ borderRadius: '50%', m: 0, p: '10px 20px', minWidth: 0 }} className={'left-arrow'} onClick={prev}>
                        <ArrowBackIosNewIcon fontSize="large" />
                    </Button>)}
                <div className="carousel-content-wrapper">
                    <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * props.cardLength}px)` }}>
                        {children}
                    </div>
                </div>
                {currentIndex <= (length - Math.round(props.widthContainer / props.cardLength) - 1) &&
                    (
                        <Button variant="contained" color="success" sx={{ borderRadius: '50%', m: 0, p: '10px 20px', minWidth: 0 }} className={'right-arrow '} onClick={next}>
                            <ArrowForwardIosIcon fontSize="large" />
                        </Button>
                    )}
            </div>
        </div>

    );
}

export default Carousel