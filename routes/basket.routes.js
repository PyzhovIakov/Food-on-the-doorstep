const {Router} = require('express')
const User = require('./../models/User')
const Catalog = require('./../models/Catalog')
const {basketUserValidation} = require('./../check/checkBasket')
const {validationResult}=require('express-validator')
const router=Router()

router.patch('/:id', basketUserValidation, async(req,res)=>{
    try
    {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }

        const userId = req.params.id
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({error:'Пользователь не найден'})
        }
        const basket = []
        for(let i=0;i<req.body.basket.length;i++){
            basket.push({product:req.body.basket[i].product._id, count:req.body.basket[i].count})
        }
        await User.updateOne({_id:userId},{
            basket:basket
        })                 
    }
    catch(e){
        res.status(500).json({error:'Что-то пошло не так, попробуйте ещё раз.'})
    }
})

module.exports=router