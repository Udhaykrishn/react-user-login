import { config } from "dotenv";
config();

const ENV = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
    JWT: process.env.JWT,
}

export default ENV