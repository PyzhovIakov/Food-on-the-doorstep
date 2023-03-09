import React,{useEffect,useState} from 'react'
import useHttp from './../../hooks/http.hook.js'
import CategoriesProduct from './../../Component/categoriesProduct/categoriesProduct'
import Alert from '@mui/material/Alert';

export default function Catalog() {
  const {loading,request,error,ClearError} = useHttp()
  const [product, setProduct] = useState({})
  const [errors, setErrors] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(()=>{
    async function Fetchdata(){
      try
      {
        const data =await request('/catalog','GET')
        setProduct(data)
        if(data.errors){setErrors(data.errors)}
      }catch(e){console.log('Catalog useEffect Fetchdata', e)}
      
    }
    Fetchdata()
  },[request])

   

  return (
    <div>
      {error?<Alert severity="error" onClose={() => {ClearError()}}>{error}</Alert>:null}
      {errors?<Alert severity="warning" onClose={() => {setErrors(null)}}>{errors}</Alert>:null}
      {message?<Alert severity="info" onClose={() => {setMessage(null)}}>{message}</Alert>:null}
      {loading?null:<CategoriesProduct setErrors={setErrors} setMessage={setMessage} product={product}/>}     
    </div>
  );
}