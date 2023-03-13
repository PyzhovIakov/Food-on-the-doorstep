import React,{useState,useEffect} from 'react'
import './Carousel.css'

function Carousel(props) {
    const {children} = props
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
        <div className="carousel-container">
            <div className="carousel-wrapper" style={{height:props.cardHeight+'px'}}>
                 {  currentIndex > 0 && <button className="left-arrow" onClick={prev}>&lt;</button>}
                <div className="carousel-content-wrapper"> 
                    <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * props.cardLength}px)` }}>
                        {children}
                    </div>
                </div>
                {currentIndex <= (length - Math.round(1300/props.cardLength)-1) && <button className="right-arrow" onClick={next}>&gt;</button>}
            </div>
        </div>
            
    );
}

export default Carousel