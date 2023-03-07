const {Router} = require('express')
const Order = require('./../models/Order')
const User = require('./../models/User')
const router=Router()


router.get('', async(req,res)=>{
    try
    {
        const order = await Order.find().populate('listProducts').populate('userId')
        
        res.json(order)
    }
    catch(e){
        res.status(500).json({message:'Что-то пошло не так, попробуйте ещё раз.'})
    }
})

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

            const dateOrder = new Date()   
            dateOrder.setHours(dateOrder.getHours()+3)
            const dateDelivery = new Date()   
            dateDelivery.setHours(dateDelivery.getHours()+6)
            
            const doc = new Order({
                userId:req.body.userId,
                listProducts:req.body.listProducts,
                status:"Новый",
                fullname:fullname,
                dateOrder:dateOrder,
                dateDelivery:dateDelivery
            })
            
            await doc.save()

            res.json({message:'Успешно'})
        }catch(e){
            res.status(500).json({message:'Что-то пошло не так, попробуйте ещё раз.'})
        }
    }
)

module.exports=router