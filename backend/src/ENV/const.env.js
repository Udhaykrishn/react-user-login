import { config } from "dotenv";
config();

const ENV = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
}

export default ENV