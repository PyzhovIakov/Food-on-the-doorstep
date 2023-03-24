import React from 'react'
import Carousel from './../categoriesProduct/Сarousel/Сarousel'
import Box from '@mui/material/Box'
import discount1 from './../../Image/dis1.jpg'
import discount2 from './../../Image/dis2.jpg'
import discount3 from './../../Image/dis3.jpg'

export default function Banner(props) {

    return (
        <div style={{ marginTop: '25px' }}>
            <Carousel cardLength={1200} cardHeight={410}>
                <Box sx={{ width: '1200px', height: '400px', marginLeft: '5px', marginRight: '5px', bgcolor: 'success.main', boxShadow: 3 }} >
                    <img src={discount1} alt={'1'} width={'100%'} height={'100%'} />
                </Box>
                <Box sx={{ width: '1200px', height: '400px', marginLeft: '5px', marginRight: '5px', bgcolor: 'success.main', boxShadow: 3 }}>
                    <img src={discount2} alt={'1'} width={'100%'} height={'100%'} />
                </Box>
                <Box sx={{ width: '1200px', height: '400px', marginLeft: '5px', marginRight: '5px', bgcolor: 'success.main', boxShadow: 3 }}>
                    <img src={discount3} alt={'1'} width={'100%'} height={'100%'} />
                </Box>
            </Carousel>
        </div>
    );
}