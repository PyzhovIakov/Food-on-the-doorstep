const {Router} = require('express')
const Order = require('./../models/Order')
const User = require('./../models/User')
const {validationResult}=require('express-validator')
const {orderUpdateCheck} = require('./../check/checkOrder')
const router=Router()


router.get('', async(req,res)=>{
    try
    {
        const order = await Order.find().populate('listProducts').populate('userId')
        
        res.json(order)
    }
    catch(e){
        res.status(500).json({errors:'Что-то пошло не так, попробуйте ещё раз.'})
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
                await User.updateOne({_id:userId},{
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
            res.status(500).json({errors:'Что-то пошло не так, попробуйте ещё раз.'})
        }
    }
)

router.patch('/:id',orderUpdateCheck, async(req,res)=>{
    try
    {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const orderId = req.params.id
        const order = await Order.findById(orderId)
        if(!order){
            return res.status(404).json({errors:'Такого заказа нет'})
        }

        await Order.updateOne({_id:orderId},{
            status: req.body.status,
            dateDelivery: req.body.dateDelivery
        })
        res.json({message:"Успешно"})

    }
    catch(e){
        res.status(500).json({errors:'Что-то пошло не так, попробуйте ещё раз.'})
    }
})


module.exports=router