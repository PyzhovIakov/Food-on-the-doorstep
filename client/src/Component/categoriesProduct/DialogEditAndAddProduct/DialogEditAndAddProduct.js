import React,{useEffect,useState, useRef} from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
//import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import logo from './../../../Image/logo.png'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import useUploadImage from './../../../hooks/uploadImage.hook'

export default function DialogEditAndAddProduct(props) {
    const {loading,request,error,ClearError} = useUploadImage()
    const [product, setProduct] = useState({name:'',imageUrl:'',category:'',weight:'',price:'',description:''})
    const [listCategories, setListCategories] = useState([])
    const imageFile = useRef(null);

    const ChangeHandler = event=>{
        setProduct({...product,[event.target.name]:event.target.value})
    }

    const handleClose = () => {
        props.setOpen(false);
    };

    const ChangeFileImage = async(event) => {
        try{
            const formDate = new FormData()
            const file = event.target.files[0]
            formDate.append('ImagesProducts',file)
            const data  = await request('/upload/ImagesProducts','POST', formDate)
            setProduct({...product, imageUrl:data.url})
        }catch(e){console.log('DialogEditAndAddProduct ChangeFileImage', e)}
    } 

    const dataExistenceCheck = () => {
        if(props.product){
            setProduct(props.product)
        }
        setListCategories([])
        if(props.categories){
            Object.keys(props.categories).map((key)=>setListCategories((prev)=>[...prev, key]))
        }
    }

    useEffect(()=>{
        dataExistenceCheck()
    },[])

    if(error){setTimeout(() => ClearError(), 6000)}

    return (
        <div>
        <Dialog open={props.open} onClose={handleClose} maxWidth={'md'} fullWidth={true}>
            <DialogTitle>
            <Stack  direction="row"  justifyContent="space-between" alignItems="center">
                {props.title}
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            </DialogTitle>
            <DialogContent>
                {error?<Alert severity="error" onClose={ClearError}>{error}</Alert>:null}
                <Stack  direction="column"  spacing={2}>
                    <Stack  direction="row" justifyContent="space-around" alignItems="stretch" spacing={2}>
                        <Stack  direction="column" justifyContent="center" alignItems="center" spacing={2}>
                            {
                                loading?
                                    <Skeleton variant="rounded" width={350} height={200} />:
                                    <img 
                                        src={product.imageUrl?'http://localhost:5000'+product.imageUrl:logo} 
                                        height={'200px'}
                                        style={{borderRadius:'15px'}} 
                                        alt={product.name}
                                    />
                            }
                            <input ref={imageFile} onChange={ChangeFileImage} style={{display:'none'}} type="file" id="imageUrl" name="imageUrl" accept="image/png, image/jpeg"/>
                            <Button 
                                variant="outlined"
                                color="success"
                                startIcon={<CameraAltIcon size="large"  />}
                                sx={{borderRadius:'15px',width:'200px'}}
                                onClick={()=>imageFile.current.click()}
                            >
                                Изменить фото
                            </Button>
                        </Stack>
                        
                        <Stack  direction="column" spacing={2}>
                            <TextField
                                sx={{m:'5px 0'}}
                                required
                                label="Название"
                                onChange={ChangeHandler}
                                defaultValue={product.name}
                                name="name"
                            />
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Категория</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={product.category}
                                    label="Категория"
                                    name='category'
                                    onChange={ChangeHandler}
                                >
                                    {
                                        listCategories.map((category,index)=>(
                                            <MenuItem key={index} value={category}>{category}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <TextField
                                required
                                label="Вес"
                                onChange={ChangeHandler}
                                defaultValue={product.weight}
                                name="weight"
                            />
                            <TextField
                                required
                                label="Цена"
                                onChange={ChangeHandler}
                                defaultValue={product.price}
                                name="price"
                            />
                        </Stack>
                    </Stack>
                    <TextField
                        sx={{width:'100%'}}
                        required
                        multiline
                        label="Описание"
                        onChange={ChangeHandler}
                        defaultValue={product.description}
                        name="description"
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
                <Button>{props.title}</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}