import React,{useEffect,useState} from 'react'
import useHttp from './../../hooks/http.hook.js'
import CategoriesProduct from './../../Component/categoriesProduct/categoriesProduct'
import Alert from '@mui/material/Alert';

export default function Catalog() {
  const {loading,request,error,ClearError} = useHttp()
  const [product, setProduct] = useState({})

  useEffect(()=>{
    async function Fetchdata(){
      const data =await request('/catalog','GET')
      setProduct(data)
    }
    Fetchdata()
  },[request])

   

  return (
    <div>
      {error?<Alert severity="error" onClose={() => {ClearError()}}>{error}</Alert>:null}
      {loading?null:<CategoriesProduct product={product}/>}     
    </div>
  );
}