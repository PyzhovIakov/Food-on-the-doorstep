const express = require('express')
const config =require('config')
const mongoose = require('mongoose')
const app = express()


app.use(express.json({extended:true}))
app.use('/auth',require('./routes/auth.routes'))
app.use('/catalog',require('./routes/catalog.routes'))


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


