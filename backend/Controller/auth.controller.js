import { User } from "../Models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup= async(req,res)=>{
    console.log(req.body);
    const {email,password,name}=req.body;
    try {
        if(!email||!password||!name){
            res.status(401).json({'message':"All fields are not specified"})
        }
        const userExists= await User.findOne({email});
        if(userExists){
            res.status(401).json({'Message':"User already exists"});
        }
        const hashedPassword=bcrypt.hashSync(password);
        const user =new User({
            email,
            password:hashedPassword,
            name,
            verificationToken:Math.floor(10000 + Math.floor()*90000).toString(),
            verificationTokenExpiresAt:Date.now()+24*60*60*1000,
        })

        await user.save();

        const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:'strict',
            secure:process.env.NODE_ENV,
            maxAge:24*60*60*1000
        })
        console.log('token',token);

    } catch (error) {
        console.log(error.message);
    }
}

export const login=async (req,res)=>{
    res.status(200).json({'message':'Login Page'});
}

export const logout=async (req,res)=>{
    res.status(200).json({'message':'Logout Page'});
}