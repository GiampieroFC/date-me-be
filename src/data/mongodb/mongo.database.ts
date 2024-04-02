import mongoose from "mongoose";

export const connectMongo = async () => {
    if (!process.env.MONGO_CONNECTION_STRING) throw new Error('🆇 Mongo connection string not found');
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
            dbName: process.env.MONGO_DATABASE_NAME
        });
        console.log("🍃 ㏈");
    } catch (error) {
        console.log("📛 ㏈", error);
    }
}

