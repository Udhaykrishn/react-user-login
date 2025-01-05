import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/slice/user/userSlice"
import userProfileReducer from "@/slice/user/userProfile"
import userAuthReducer  from "@/slice/user/userAuth";
import adminAuthReducer from "@/slice/admin/adminAuth"

export const store = configureStore({
    reducer: {
        users: userReducer,
        userProfile: userProfileReducer,
        userAuth:userAuthReducer,
        adminAuth:adminAuthReducer
    }
})