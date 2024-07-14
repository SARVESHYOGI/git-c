import mongoose from "mongoose";

export default async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI,
            //      {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            // }
        );
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed");
    }
}
// }