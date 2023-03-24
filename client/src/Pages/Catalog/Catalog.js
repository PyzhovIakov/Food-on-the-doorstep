import React, { useEffect, useState, useContext } from 'react'
import useHttp from './../../hooks/http.hook.js'
import CategoriesProduct from './../../Component/categoriesProduct/categoriesProduct'
import AuthContext from './../../context/AuthContext'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import LinearProgress from '@mui/material/LinearProgress'
import DialogEditAndAddProduct from './../../Component/categoriesProduct/DialogEditAndAddProduct/DialogEditAndAddProduct'

export default function Catalog() {
  const { loading, request, error, ClearError } = useHttp()
  const ContextAuth = useContext(AuthContext)
  const [product, setProduct] = useState({})
  const [openDialogEditAndAddProduct, seOpenDialogEditAndAddProduct] = useState(false)

  const fetchDataCatalog = async () => {
    try {
      setProduct({})
      const data = await request('/catalog', 'GET')
      setProduct(data)
    } catch (e) { console.log('Catalog fetchDataCatalog', e) }
  }

  const EditProduct = async (product) => {
    try {
      await request(`/catalog/${product._id}`, 'PATCH', { ...product })
      seOpenDialogEditAndAddProduct(false)
      fetchDataCatalog()
    } catch (e) { console.log('Catalog EditProduct', e) }
  }

  const DeleteProduct = async (id) => {
    try {
      await request(`/catalog/${id}`, 'DELETE')
      fetchDataCatalog()
    } catch (e) { console.log('Catalog DeleteProduct', e) }
  }

  const AddProduct = async (product) => {
    try {
      await request('/catalog', 'POST', { ...product })
      seOpenDialogEditAndAddProduct(false)
      fetchDataCatalog()
    } catch (e) { console.log('Catalog AddProduct', e) }
  }

  useEffect(() => {
    fetchDataCatalog()
  }, [request])

  setInterval(() => { fetchDataCatalog() }, 3000000)
  if (error) { setTimeout(() => ClearError(), 6000) }

  return (
    <div>
      {error ? <Alert severity="error" onClose={ClearError}>{error}</Alert> : null}
      {
        ContextAuth.role === 'manager' ?
          <Button disabled={loading} onClick={() => seOpenDialogEditAndAddProduct(true)} variant="contained" color="success" sx={{ borderRadius: '15px', m: '20px 5px' }} startIcon={<AddIcon />}>
            Добавить в меню
          </Button>
          : null
      }

      {
        loading ?
          <LinearProgress color="success" /> :
          <>
            <DialogEditAndAddProduct
              buttonClick={AddProduct}
              categories={product}
              title={'Добавить продукт'}
              open={openDialogEditAndAddProduct}
              setOpen={seOpenDialogEditAndAddProduct}
            />
            <CategoriesProduct product={product} DeleteProduct={DeleteProduct} EditProduct={EditProduct} />
          </>

      }
    </div>
  );
}