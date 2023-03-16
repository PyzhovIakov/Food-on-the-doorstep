import React,{useContext, useEffect,useState} from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Skeleton from '@mui/material/Skeleton'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import logo from './../../Image/logo.png'
import TemporaryBasketContext from './../../context/TemporaryBasketContext'

export default function TapeBasket() {
    const BasketContext = useContext(TemporaryBasketContext)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
      setLoading(true)
    },[])

    setTimeout(() => setLoading(false), 1000)

    return(
        <Box sx={{ width:'95%', marginLeft:'auto',marginRight:'auto'}}>
            {
                BasketContext.basket.length!==0?
                    BasketContext.basket.map((basket,index)=>(
                        <Stack key={index} direction="row" alignItems="flex-start" justifyContent="space-between" sx={{height:'200px', borderRadius:'15px' ,boxShadow:3, marginTop:'10px'}}>
                            {
                                loading?
                                    <Skeleton variant="rounded" width={400} height={200} />:
                                    <img 
                                        src={basket.product.imageUrl?'http://localhost:5000'+basket.product.imageUrl:logo} 
                                        height={'100%'}
                                        style={{borderRadius:'15px'}} 
                                        alt={basket.product.name}
                                    />
                            }
                            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{margin:'10px 0'}}>
                                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{border:'2px solid',borderColor: 'success.main', borderRadius:'50px'}}>
                                    <Button onClick={()=>{BasketContext.IncrementBasket(basket.product)}} variant="contained" color="success" sx={{borderRadius:'50%', m:0,p:'5px', minWidth:0}}>
                                        <AddIcon/>
                                    </Button>
                                    <h3>{basket.count}</h3>
                                    <Button onClick={()=>{BasketContext.IncrementBasket(basket.product)}} variant="contained" color="success" sx={{borderRadius:'50%', m:0,p:'5px', minWidth:0}}>
                                        <HorizontalRuleIcon/>
                                    </Button>
                                </Stack>
                                <Button variant="contained" color="success" sx={{borderRadius:'15px'}}>
                                    Удалить        
                                </Button>
                            </Stack>
                              
                            <Stack direction="column" sx={{width:'62%'}}>
                                <Stack direction="row">
                                    <h2 style={{padding:0,margin:'0 15px'}}>{basket.product.name}</h2>
                                    <h3 style={{padding:0,margin:'0 15px'}}>{basket.product.price}p</h3>
                                </Stack>
                                <h4 style={{padding:0,margin:'0 15px'}}>{basket.product.description}</h4>
                            </Stack> 
                        </Stack>
                    )):null
            }
            
        </Box>
    );
}