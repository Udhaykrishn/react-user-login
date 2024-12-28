import express from "express"
import { config } from "dotenv"
import ConnectDB from "#config/db.config.js"

config();


const app = express();


app.use(express.json())


app.get("/", (req, res) => {
    return res.send("Hello world")
})

const bootstrap = async () => {
    try {
        await ConnectDB.connect();

        const PORT = process.env.PORT;

        app.listen(PORT, () => console.log("server is started"))
    } catch (error) {
        console.error(`Failed to start server due to database connection error: ${erro.message}`)
    }
}

bootstrap();