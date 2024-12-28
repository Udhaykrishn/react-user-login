import mongoose from "mongoose"
import ENV from "#env/const.env.js";

class ConnectDB {
    constructor() {
        this.mongodbURL = ENV.MONGODB_URL
    }

    UrlNotFound() {
        if (!this.mongodbURL) {
            console.log("MongoDb connection string is not defined in environment variables")
            process.exit(1);
        }
    }

    async connect() {
        try {
            this.UrlNotFound(); 
            await mongoose.connect(this.mongodbURL)
            console.log("Database connected")
        } catch (error) {
            console.log("Failed to connect database")
            process.exit(1)
        }
    }
}

export default new ConnectDB();