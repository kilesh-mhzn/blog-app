import mongoose from 'mongoose';

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI).catch((e) => {
        console.log(e);
    });
    console.log(`MongoDB is connected: ${conn.connection.host}`);
};

export default connectDB;
