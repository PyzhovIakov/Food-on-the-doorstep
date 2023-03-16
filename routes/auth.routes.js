const {Router} = require('express')
const bcrypt =require('bcrypt')
const {validationResult}=require('express-validator')
const {registerValidation, loginValidation} = require('./../check/checkAuth')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('./../models/User')
const router=Router()

router.post(
    '/registration',
    registerValidation,
     async (req,res)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
            
        const candidate = await User.findOne({email:req.body.email})
        if(candidate){
            return res.status(400).json({error:'Пользователь c таким email уже зарегистрирован'})
        }

        const hashedPassword =await bcrypt.hash(req.body.password,12)
            
        const doc = new User({
            email:req.body.email,
            password:hashedPassword,
            fullname:req.body.fullname,
            role:req.body.role
        })
        const user= await doc.save()

        const {password, ...userData} = user._doc
        const token = jwt.sign(
            {userId:user.id},
            config.get('jwtkey'),
            {expiresIn:'1h'}
        )
        
        res.json({...userData,token, message:"Успешно зарегистрировались"})
    }catch(e){
        res.status(500).json({error:'Что-то пошло не так, попробуйте ещё раз.'})
    }
})

router.post(
    '/login',
    loginValidation,
    async(req,res)=>{
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()})
            }
    
            const user = await User.findOne({email:req.body.email}).populate('basket')
            if(!user){
                return res.status(400).json({error:'Неверный логин или пароль'})
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if(!isMatch){
                return res.status(400).json({error:'Неверный логин или пароль'})
            }

            const {password, ...userData} = user._doc
            const token = jwt.sign(
                {userId:user.id},
                config.get('jwtkey'),
                {expiresIn:'1h'}
            )
            
            res.json({...userData,token, message:"Успешно авторизовались"})
        }catch(e){
            res.status(500).json({error:'Что-то пошло не так, попробуйте ещё раз.'})
        }
})

router.get('/:id', async(req,res)=>{
    try
    {
        const userId = req.params.id
        const user = await User.findById(userId).populate('basket.product')
        if(!user){
            return res.status(404).json({error:'Пользователь не найден'})
        }
        const {password, ...userData} = user._doc 
        res.json({...userData})
    }
    catch(e){
        res.status(500).json({error:'Что-то пошло не так, попробуйте ещё раз.'})
    }
})

module.exports=router