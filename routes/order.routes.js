const {Router} = require('express')
const Order = require('./../models/Order')
const router=Router()

router.post(
    '',
    async (req,res)=>{
        try{    
               
            const doc = new Order({
                userId:req.body.userId,
                listProducts:req.body.listProducts,
                status:req.body.status
            })
            await doc.save()

            res.json({message:'Успешно'})
        }catch(e){
            res.status(500).json({message:'Что-то пошло не так, попробуйте ещё раз.'})
        }
    }
)

module.exports=router