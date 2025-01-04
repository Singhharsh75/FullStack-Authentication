import express from 'express';
import authRoutes from './Routes/auth.routes.js';
import connectDb from './Db/mongo.connect.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app=express();
const PORT=process.env.PORT||5004;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/auth',authRoutes);

app.listen(PORT,()=>{
    connectDb();
    console.log(`Server is running on PORT:${PORT}`);
})