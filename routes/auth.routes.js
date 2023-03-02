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
            
        const candidate = await User.findOne({email:req.body.email})
        if(candidate){
            return res.status(400).json({message:'Пользователь c таким email уже зарегистрирован'})
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
        
        res.json({...userData,token})
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
    
            const user = await User.findOne({email:req.body.email}).populate('basket')
            if(!user){
                return res.status(400).json({message:'Неверный логин'})
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if(!isMatch){
                return res.status(400).json({message:'Неверный пароль'})
            }

            const {password, ...userData} = user._doc
            const token = jwt.sign(
                {userId:user.id},
                config.get('jwtkey'),
                {expiresIn:'1h'}
            )
            
            res.json({...userData,token})
        }catch(e){
            res.status(500).json({message:'Что-то пошло не так, попробуйте ещё раз.'})
        }
})

router.get('/:id', async(req,res)=>{
    try
    {
        const userId = req.params.id
        const user = await User.findById(userId).populate('basket')
        if(!user){
            return res.status(404).json({message:'Пользователь не найден'})
        }
        const {password, ...userData} = user._doc 
        res.json({...userData})
    }
    catch(e){
        res.status(500).json({message:'Что-то пошло не так, попробуйте ещё раз.'})
    }
})

module.exports=router