const {check}=require('express-validator')

const basketUserValidation = [
    check('basket','Продукт не выбран').exists()
]

module.exports={basketUserValidation}