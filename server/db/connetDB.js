import mongoose from "mongoose";

const connectDB = async() => {
 
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        console.log("Error connection to MongoDB: ", error.message);
		process.exit(1); // 1 is failure, 0 status code is success
    }
    
}
export default connectDB