const express = require('express')
const config =require('config')
const mongoose = require('mongoose')
const multer = require('multer')

const app = express()

//storage img
const storage = multer.diskStorage({
    destination:(_,__,cd)=>{
        cd(null,'uploads')
    },
    filename:(_,file,cd)=>{
        cd(null,file.originalname)
    },
})
const upload = multer({storage})

app.use(express.json({extended:true}))
app.use('/auth',require('./routes/auth.routes'))
app.use('/catalog',require('./routes/catalog.routes')) 
app.use('/basket',require('./routes/basket.routes')) 
app.use('/order',require('./routes/order.routes'))

//uploads images
app.use('/uploads', express.static('uploads'))
app.post('/upload', upload.single('image'), (req,res)=>{
    res.json({url:`/uploads/${req.file.originalname}`})
})



const PORT = config.get('port') || 5000
async function start(){
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(config.get('mongoUri'))
        .then(()=>console.log('db ok...'))
        .catch((err)=>console.log('ERROR',err))

        app.listen(PORT,()=>console.log(`app on port ${PORT}`))
    } catch (e) {
        console.log('error :',e.message)
        process.exit()
    }
}

start()


