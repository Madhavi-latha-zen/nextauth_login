import mongoose from "mongoose";

const connect = async (): Promise<void> => {
    if (mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to MongoDB successfully..............");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Error Connecting To Mongoose");
    }
};

export default connect;
