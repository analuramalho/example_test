const jwt=require('jsonwebtoken')
const { promisify }=require('util')

module.exports = async(req,res,next)=>{
    const authHeader = req.headers.authorization;

    //verifica se existe token
    if(!authHeader){
        return res.status(401).json({message:"Token not provided"});
    }


    //verifica se o token é valido
    const [, token]=authHeader.split(' ');
    try {

        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)

        req.userId = decoded.id;

        return next()
    } catch (error) {
        return res.status(401).json({message:"Token invalid"});
    }



    
}