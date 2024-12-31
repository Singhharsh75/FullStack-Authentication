import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI);
        console.log(connect.connection.host);
    } catch (error) {
        console.log("Database not connected");
        process.exit(1);
    }
}

export default connectDb;