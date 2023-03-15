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
            return res.status(400).json({errors:errors.array()})
        }

        const userId = req.params.id
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({errors:'Пользователь не найден'})
        }

        const product = await Catalog.findById(req.body.basket)
        if(!product){
            return res.status(404).json({errors:'Продукт не найден'})
        }
        if(req.body.type==='Increment'){
            let FlagAdd=false
            for(let i=0;i<user.basket.length;i++){
                if(user.basket[i].productId==req.body.basket){
                    user.basket[i].count += 1
                    await User.updateOne({_id:userId},{
                        basket:user.basket
                    })
                    
                    FlagAdd=true
                    res.json({message:"Такой товар уже в корзине"})
                }
            }
            if(!FlagAdd){
                user.basket.push({productId:req.body.basket, count:1})
                await User.updateOne({_id:userId},{
                    basket: user.basket
                })
                res.json({message:"Товар добавлен в корзину"})
            }
        }else{
            for(let i=0;i<user.basket.length;i++){
                if(user.basket[i].productId==req.body.basket){
                    user.basket[i].count -= 1
                    await User.updateOne({_id:userId},{
                        basket:user.basket
                    })
                    res.json({message:"Такой товар уже в корзине"})
                }
            }
        }
       
    }
    catch(e){
        res.status(500).json({errors:'Что-то пошло не так, попробуйте ещё раз.'})
    }
})

module.exports=router