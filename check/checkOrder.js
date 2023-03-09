const {check}=require('express-validator')

const orderUpdateCheck = [
    check('status','Статус не выбран').exists(),
    check('dateDelivery', 'Дата не выбрана').isDate()
]


module.exports={orderUpdateCheck}