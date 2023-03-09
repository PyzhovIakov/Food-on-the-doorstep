const {check}=require('express-validator')

const productValidation = [
    check('name','Введите имя').exists(),
    check('category', 'Введите категорию').exists(),
    check('weight','Введите вес').exists(),
    check('price','Введите стоимость').isNumeric(),
    check('description', 'Введите описание').exists(),
    check('imageUrl','Введите путь').optional().isURL()
]


module.exports={productValidation}