const jwt = require('jsonwebtoken')
const config = require('config')

checkToken = (req,res,next)=>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')
    console.log('req.headers.authorization',req.headers.authorization)
    if(token){
        try
        {  
            const decoded = jwt.verify(token,config.get('jwtkey')) 
            req.userId=decoded.userId
            next()
        }catch(e){
            return res.status(403).json({message:'Нет доступа'})
        }
    }
    else{
        return res.status(403).json({message:'Нет доступа'})
    }
};
module.exports=checkToken