const {Router} = require('express')
const User = require('./../models/User')
const router=Router()


router.patch('/:id', async(req,res)=>{
    try
    {
        const userId = req.params.id
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:'Пользователь не найден'})
        }
        if(!user.basket.includes(req.body.basket)){
            user.basket.push(req.body.basket)
            const update = await User.updateOne({userId},{
                basket:user.basket
            })
            res.json({message:update})
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