import mongoose from "mongoose"
import { env } from "process";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Successfully connected to Atlas");
    }catch {
        console.log("failure connected to Atlas");
        throw new Error()
    }
}

export default connectDB