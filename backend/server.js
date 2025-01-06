import express from 'express';
import authRoutes from './Routes/auth.routes.js';
import connectDb from './Db/mongo.connect.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();

const app=express();
const PORT=process.env.PORT||5004;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.CLIENT_URL||'http://localhost:5173',
    credentials:true
}));

const _dirname=path.resolve();


app.use('/api/auth',authRoutes);

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(_dirname,"/frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,"frontend",))
    })
}

app.listen(PORT,()=>{
    connectDb();
    console.log(`Server is running on PORT:${PORT}`);
})