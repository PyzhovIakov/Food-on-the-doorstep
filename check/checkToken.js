//Not used
const jwt = require('jsonwebtoken')
const config = require('config')

checkToken = (req,res,next)=>{
    const token = req.body.token
   
    if(token){
        try
        {  
            const decoded = jwt.verify(token,config.get('jwtkey')) 
            req.userId=decoded.userId
            next()
        }catch(e){
            return res.status(403).json({errors:'Нет доступа'})
        }
    }
    else{
        return res.status(403).json({errors:'Нет доступа'})
    }
};
module.exports=checkToken