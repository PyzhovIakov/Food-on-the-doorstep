const {Router} = require('express')
const User = require('./../models/User')
const Catalog = require('./../models/Catalog')
const router=Router()


router.patch('/:id', async(req,res)=>{
    try
    {
        const userId = req.params.id
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:'Пользователь не найден'})
        }
        const product = await Catalog.findById(req.body.basket)
        if(!product){
            return res.status(404).json({message:'Продукт не найден'})
        }
        if(!user.basket.includes(req.body.basket)){
            user.basket.push(req.body.basket)
            const u = await User.updateOne({_id:userId},{
                basket: user.basket
            })
            res.json({message:u})
        }
        else{
            res.json({message:'Такой товар уже в корзине'})
        }
    }
    catch(e){
        res.status(500).json({message:'Что-то пошло не так, попробуйте ещё раз.'})
    }
})

module.exports=router