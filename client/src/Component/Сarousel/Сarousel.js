import React from 'react'


export default function Carousel() {
 
  return (
    <div className="carousel-container">
        <div className="carousel-wrapper">
            <div className="carousel-content-wrapper">
                <div className="carousel-content">
                    {children}
                </div>
            </div>
        </div>
    </div>
  );
}