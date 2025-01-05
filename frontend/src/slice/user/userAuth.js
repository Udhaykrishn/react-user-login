import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userSignIn = createAsyncThunk("user/signin",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const responose = await axios.post("/user/login", payload);

            if (responose?.data?.user) {
                return responose?.data?.user
            }
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to user login")
        }
    }
)

export const userSignUp = createAsyncThunk("user/register",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const responose = await axios.post("/user/register", payload);
            console.log(responose.data)
            if (responose?.data?.success) {
                return responose?.data?.user
            }
            console.log(responose.data,"in register res")
            // return rejectWithValue(responose?.data?.message || "Registraction failed")
        } catch (error) {
            console.log(error)
           return rejectWithValue(error?.response?.data?.message || "Failed to user register")
        }
    }
)

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: {
        pending: false,
        error: null,
        user: null
    },
    extraReducers: (build) => {
        build.addCase(userSignIn.pending, (state) => {
            state.pending = true;
            state.error = null;
        }).addCase(userSignIn.fulfilled, (state) => {
            state.pending = false,
                state.error = null;
        }).addCase(userSignIn.rejected, (state, action) => {
            state.pending = false,
                state.error = action.payload
        }).addCase(userSignUp.pending, (state) => {
            state.pending = true
        }).addCase(userSignUp.fulfilled, (state, action) => {
            state.pending = false,
                state.error = null,
                state.user = action.payload
        }).addCase(userSignUp.rejected, (state, action) => {
            state.error = action.payload
        })
    }
})

export default userAuthSlice.reducer