import express from "express"
import ConnectDB from "#config/db.config.js"
import ENV from "#env/const.env.js";

import UserRouter from "#router/user.routers.js"

const app = express();


app.use(express.json())


app.get("/user",UserRouter)

const bootstrap = async () => {
    try {
        await ConnectDB.connect();

        const PORT = ENV.PORT

        app.listen(PORT, () => console.log("server is started ",PORT))
    } catch (error) {
        console.error(`Failed to start server due to database connection error: ${error.message}`)
    }
}

bootstrap();