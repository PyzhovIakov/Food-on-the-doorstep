const {Router} = require('express')
const {check,validationResult}=require('express-validator')
const {productValidation} = require('./../check/checkCatalog')
const Catalog = require('./../models/Catalog')
const router=Router()


router.post(
    '',
    productValidation,
    async (req,res)=>{
        try{    
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({error:errors.array()})
            }
            
            const doc = new Catalog({
                name:req.body.name,
                category:req.body.category,
                weight:req.body.weight,
                price:req.body.price,
                description:req.body.description,
                imageUrl:req.body.imageUrl,
                isStopped:false
            })
            await doc.save()

            res.json({message:'Успешно'})
        }catch(e){
            res.status(500).json({error:'Что-то пошло не так, попробуйте ещё раз.'})
        }
    }
)

router.get('', async(req,res)=>{
    try
    {
        const catalog = await Catalog.find()
        
        var newData={}

        for(var i=0;i<catalog.length;i++){
            if(!(catalog[i].category in newData)){
                newData[catalog[i].category]=[]
            }
            newData[catalog[i].category].push(catalog[i]);
        }
        res.json(newData)
    }
    catch(e){
        res.status(500).json({error:'Что-то пошло не так, попробуйте ещё раз.'})
    }
})

router.get('/:id', async(req,res)=>{
    try
    {
        const productId = req.params.id
        const product = await Catalog.findById(productId)
        if(!product){
            return res.status(404).json({error:'Продукт не найден'})
        }

        res.json(product)
    }
    catch(e){
        res.status(500).json({error:'Что-то пошло не так, попробуйте ещё раз.'})
    }
})

router.patch('/:id', productValidation, async(req,res)=>{
    try
    {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const productId = req.params.id
        const product = await Catalog.findById(productId)
        if(!product){
            return res.status(404).json({error:'Такого продукта нет'})
        }

        await Catalog.updateOne({_id:productId},{
            name:req.body.name,
            category:req.body.category,
            weight:req.body.weight,
            price:req.body.price,
            description:req.body.description,
            imageUrl:req.body.imageUrl,
            isStopped:req.body.isStopped
        })
        res.json({message:"Успешно"})
    }
    catch(e){
        res.status(500).json({error:'Что-то пошло не так, попробуйте ещё раз.'})
    }
})

router.delete('/:id', async(req,res)=>{
    try
    {
        const productId = req.params.id
        
        await Catalog.findOneAndDelete({_id:productId})

        res.json({message:"Успешно"})

    }
    catch(e){
        res.status(500).json({error:'Что-то пошло не так, попробуйте ещё раз.'})
    }
})
module.exports=router
