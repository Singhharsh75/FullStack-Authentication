import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware=async(req,res,next)=>{
    const token=req.cookies.token;
    
    if(!token){
        return res.status(400).json({message:'Token not found'});
    }
    try {
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                res.status(400).json({message:"Error in authentication"})
            }
            req.userId=decoded.id;
        })
        console.log(req.userId);
        next();
    } catch (error) {
        console.log(error.message);
    }
}
