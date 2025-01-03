import { config } from "dotenv";
config();

const ENV = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    SUPABASE_URL:process.env.SUPABASE_URL,
    SUPABASE_API_KEY:process.env.SUPABASE_API_KEY
}

export default ENV