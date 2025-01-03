import {createClient} from "@supabase/supabase-js"
import env from "#env/const.env.js"


export const supabase = createClient(env.SUPABASE_URL,env.SUPABASE_API_KEY)