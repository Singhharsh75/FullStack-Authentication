import express from 'express';
import authRoutes from './Routes/auth.routes.js';
import connectDb from './Db/mongo.connect.js';

const app=express();
const PORT=process.env.PORT||5004;

app.use(express.json());

app.use('/api/auth',authRoutes);

app.listen(PORT,()=>{
    connectDb();
    console.log(`Server is running on PORT:${PORT}`);
})