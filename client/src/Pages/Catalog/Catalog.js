import React,{useEffect} from 'react'
import Carousel from '../../Component/Сarousel/Сarousel'
import Box from '@mui/material/Box'



export default function Catalog() {
 
    useEffect(()=>{


    },[])

  return (
    <div>
        <Carousel>
            <Box sx={{ width: 250, height: 250, backgroundColor: 'primary.dark', marginLeft:'5px',marginRight:'5px' }}>1</Box>
            <Box sx={{ width: 250, height: 250, backgroundColor: 'primary.dark', marginLeft:'5px',marginRight:'5px'}}>2</Box>
            <Box sx={{ width: 250, height: 250, backgroundColor: 'primary.dark', marginLeft:'5px',marginRight:'5px'}}>3</Box>
            <Box sx={{ width: 250, height: 250, backgroundColor: 'primary.dark', marginLeft:'5px',marginRight:'5px'}}>4</Box>
            <Box sx={{ width: 250, height: 250, backgroundColor: 'primary.dark', marginLeft:'5px',marginRight:'5px'}}>5</Box>
            <Box sx={{ width: 250, height: 250, backgroundColor: 'primary.dark', marginLeft:'5px',marginRight:'5px'}}>6</Box>
            <Box sx={{ width: 250, height: 250, backgroundColor: 'primary.dark', marginLeft:'5px',marginRight:'5px'}}>7</Box>
            <Box sx={{ width: 250, height: 250, backgroundColor: 'primary.dark', marginLeft:'5px',marginRight:'5px'}}>8</Box>
            <Box sx={{ width: 250, height: 250, backgroundColor: 'primary.dark', marginLeft:'5px',marginRight:'5px'}}>9</Box>
        </Carousel>
    </div>
  );
}