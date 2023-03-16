import React,{useEffect,useState, useContext} from 'react'
import useHttp from './../../hooks/http.hook.js'
import CategoriesProduct from './../../Component/categoriesProduct/categoriesProduct'
import AuthContext from './../../context/AuthContext'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import LinearProgress from '@mui/material/LinearProgress'

export default function Catalog() {
  const {loading,request,error,ClearError} = useHttp()
  const ContextAuth = useContext(AuthContext)
  const [product, setProduct] = useState({})

  const fetchDataCatalog = async() =>{
    try{
      setProduct({})
      const data = await request('/catalog','GET')
      setProduct(data)
    }catch(e){console.log('Catalog fetchDataCatalog', e)}
  }

  const HandlerProductRelease = async(id, FlagStop) =>{
    try{
      await request(`/catalog/${id}`,'PATCH',{isStopped:FlagStop})
      fetchDataCatalog()
    }catch(e){console.log('Catalog HandlerProductRelease', e)}  
  }


  useEffect(()=>{
    fetchDataCatalog()
  },[request])

  setInterval(() => {fetchDataCatalog()}, 3000000)
  if(error){setTimeout(() => ClearError(), 6000)}

  return (
    <div>
      {error?<Alert severity="error" onClose={ClearError}>{error}</Alert>:null}
      {
        ContextAuth.role==='manager'? 
          <Button variant="contained" color="success" sx={{borderRadius:'15px', m:'20px 5px'}} startIcon={<AddIcon/>}>
            Добавить в меню
          </Button>
          :null
      }
      {loading? <LinearProgress color="success" />:<CategoriesProduct product={product} HandlerProductRelease={HandlerProductRelease}/>}     
    </div>
  );
}