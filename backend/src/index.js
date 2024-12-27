import express from "express"
import {config} from "dotenv"
config();

const app = express();


app.use(express.json())


app.get("/",(req,res)=>{
    return res.send("Hello world")
})

const PORT = process.env.PORT;

app.listen(PORT,()=>console.log("server is started"))