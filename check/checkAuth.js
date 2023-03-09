const {check}=require('express-validator')

const registerValidation = [
    check('email','Некоректный email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов').isLength({min:8}),
    check('fullname','Введите ФИО').isLength({min:4})
]

const loginValidation = [
    check('email','Некоректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
]

module.exports={registerValidation, loginValidation}