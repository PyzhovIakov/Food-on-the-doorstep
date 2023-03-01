import React,{useEffect,useState} from 'react'
import useHttp from './../../hooks/http.hook.js'
import CategoriesProduct from './../../Component/categoriesProduct/categoriesProduct'

export default function Catalog() {
  const {loading,request,error,ClearError} = useHttp()
  const [product, setProduct] = useState({})

  useEffect(()=>{
    async function Fetchdata(){
      const data =await request('/catalog','GET')
      setProduct(data)
    }
    Fetchdata()
  },[])

  return (
    <div>
      {loading?null:<CategoriesProduct product={product}/>}     
    </div>
  );
}