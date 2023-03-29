import React from 'react'
import Carousel from './../Сarousel/Сarousel'
import Box from '@mui/material/Box'


export default function Banner(props) {

    return (
        <div style={{ marginTop: '25px' }}>
            <Carousel cardLength={1200} cardHeight={410} widthContainer={window.innerWidth * 0.98}>
                {
                    props.banner.map((img, index) => (
                        <Box key={index} sx={{ width: '1200px', height: '400px', marginLeft: '5px', marginRight: '5px', bgcolor: 'success.main', boxShadow: 3 }} >
                            <img
                                src={'http://localhost:5000'+img}
                                width={'100%'}
                                style={{ borderRadius: '15px'}}
                                alt={img}
                            />
                        </Box>
                    ))
                }
            </Carousel>
        </div>
    );
}