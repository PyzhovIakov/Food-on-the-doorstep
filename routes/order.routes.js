const {Router} = require('express')
const Order = require('./../models/Order')
const User = require('./../models/User')
const router=Router()

router.post(
    '',
    async (req,res)=>{
        try{    

            const userId = req.body.userId
            const user = await User.findById(userId)

            let fullname=""
            if(!user){
                
                fullname=req.body.fullname
            }else{
                const update = await User.updateOne({userId},{
                    basket:[]
                })
                fullname=user.fullname
            }

            const doc = new Order({
                userId:req.body.userId,
                listProducts:req.body.listProducts,
                status:"новый",
                fullname:fullname
            })
            
            await doc.save()

            res.json({message:'Успешно'})
        }catch(e){
            res.status(500).json({message:'Что-то пошло не так, попробуйте ещё раз.'})
        }
    }
)

module.exports=router