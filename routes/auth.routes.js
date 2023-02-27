const {Router} = require('express')
const bcrypt =require('bcrypt')
const {check, validationResult}=require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('./../models/User')
const router=Router()

router.post(
    '/registration',
    [
        check('email','Некоректный email').isEmail(),
        check('password', 'Минимальная длина пароля 8 символов').isLength({min:8}),
        check('fullname','Введите Имя').exists()
    ],
     async (req,res)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array(), message:'Некоректные даннные при регистрации'})
        }
        const {email,password,fullname,role}=req.body
        
        const candidate = await User.findOne({email:email})
        if(candidate){
            return res.status(400).json({message:'Пользователь c таким email уже зарегистрирован'})
        }

        const hashedPassword =await bcrypt.hash(password,12)
        const user = new User({email, password:hashedPassword,fullname,role})
        await user.save()

        res.status(201).json({message:'Успешно зарегистрировались'})
    }catch(e){
        res.status(500).json({message:'Что-то пошло не так, попробуйте ещё раз.'})
    }
})

router.post(
    '/login',
    [
        check('email','Некоректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async(req,res)=>{
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array(), message:'Некоректные даннные при авторизации'})
            }
            const {email,password}=req.body
    
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message:'Неверный логин'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({message:'Неверный пароль'})
            }
            const token = jwt.sign(
                {userId:user.id},
                config.get('jwtkey'),
                {expiresIn:'1h'}
            )
            
            res.json({token,userId:user.id, role:user.role})
        }catch(e){
            res.status(500).json({message:'Что-то пошло не так, попробуйте ещё раз.'})
        }
})

module.exports=router