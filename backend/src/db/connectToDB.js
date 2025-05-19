import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to DB: ${error.message}`);
    }
}

export default connectToDB;