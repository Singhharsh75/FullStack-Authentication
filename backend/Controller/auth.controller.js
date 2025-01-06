import { User } from "../Models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendPasswordResetReq, sendPasswordResetSuccessFullEmail, sendSignUpVerification,sendVerifiedConfirmationEmail } from "../Mailtrap/email.js";

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
        const verificationToken=Math.floor(10000+Math.random()*90000).toString();
        const user =new User({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt:Date.now()+24*60*60*1000,
        })

        await user.save();

        sendSignUpVerification(user.email,verificationToken);

        const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:'strict',
            secure:process.env.NODE_ENV,
            maxAge:24*60*60*1000
        })
        console.log('token',token);
        res.status(201).json({message:"user has been added !!",user:user});

    } catch (error) {
        console.log(error.message);
    }
}

export const verifyEmail=async(req,res)=>{
    const {code}=req.body;
    try {
        const user=await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt:Date.now()},
        })
        console.log('user_data',user,code);

        if(!user){
            return res.status(400).json({
                "message":"Invalid or expired token code !!"
            })
        }

        user.isVerified=true;
        user.verificationToken=undefined;
        user.verificationTokenExpiresAt=undefined;

        await user.save();

        sendVerifiedConfirmationEmail(user.email,user.name);

        res.status(200).json({message:'User verification email sent',user});

    } catch (error) {
        console.log(error.message);
    }
}

export const login=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(500).json({message:"User not found,Sign in to access the website !!!"})
        }
        const isPasswordVerified=bcrypt.compareSync(password,user.password);
        if(!isPasswordVerified){
            return res.status(500).json({message:"Invalid Password!!!"})
        }

        user.lastLogin= new Date();

        await user.save();

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});

        res.cookie("token",token,{
            httpOnly:true,
            sameSite:'strict',
            secure:process.env.NODE_ENV==="production",
            maxAge:24*60*60*1000
        })

        console.log("token :",token)
        res.status(200).json({message:'Login Successful',user});

    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:'Error in login in !!'})
    }
}

export const logout=async (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({'message':'Logged out successfully!!'});
}

export const passwordResetReq=async(req,res)=>{
    const {email}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({'message':"User does not exist !!"});
        }

        const token=crypto.randomUUID(20).toString('hex');
        user.resetPasswordToken=token,
        user.resetPasswordTokenExpiresAt=Date.now()+60*60*1000,
        
        console.log('password token:',token);
        await user.save();

        const resetURL=`http://localhost:5173/forgot-password/${token}`;
        sendPasswordResetReq(user.email,resetURL)

        res.status(201).json({message:'password reset initiated'});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:"Internal Server Error!!"})
    }
}

export const passwordReset=async(req,res)=>{
    const {password}=req.body;
    const {token}=req.params;

    const user=await User.findOne({
        resetPasswordToken:token,
        resetPasswordTokenExpiresAt:{$gt:Date.now()},
    });
    if(!user){
        return res.status(400).json({message:"Invalid token or token expired"});
    }
    const hashedNewPassword=bcrypt.hashSync(password);
    user.password=hashedNewPassword;
    user.resetPasswordToken=undefined;
    user.resetPasswordTokenExpiresAt=undefined;
    await user.save();

    sendPasswordResetSuccessFullEmail(user.email)

    res.status(200).json({message:"Password has been updated"});
}

export const checkAuth=async(req,res)=>{
    
    try {
        const user =await User.findById(req.userId);
        if(!user){
            return res.status(400).json({message:"User not authorized!!!"})
        }
        res.status(200).json({message:"User authorized!!!!",user})    
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:"User not authorized!!!"})
    }
}