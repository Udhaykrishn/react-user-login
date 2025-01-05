import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchUsers = createAsyncThunk('user/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/admin/dashboard/users")
            return response?.data?.users

        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to fetch users");
        }
    }
)

export const createUser = createAsyncThunk("user/createUser",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/admin/dashboard/create", payload)
            console.log(data)
            return data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data?.message || "Failed to fetch users")
        }
    }
)

export const updateUserBlockStatus = createAsyncThunk("users/updateBlockStatus",
    async ({ userId, isBlocked }, { rejectWithValue }) => {
        console.log(userId, isBlocked)
        try {
            const response = await axios.patch(`/admin/dashboard/update/${userId}`, {
                isBlocked: !isBlocked
            })
            return response?.data?.user
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to update user status")
        }
    })

export const deleteUser = createAsyncThunk("users/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/admin/dashboard/delete/${userId}`)
            if (response?.data?.success) {
                return userId
            }
            return rejectWithValue("Failed to delete user");
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to delete user")
        }
    }
)

export const editUser = createAsyncThunk("users/editUser",
    async ({ userId, email }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/admin/dashboard/update/${userId}`, { email })
            return response?.data?.user;

        } catch (error) {
            rejectWithValue(error?.response?.data?.message || "Failed to edit user");
        }
    }
)


const userSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        searchQuery: "",
        loading: false,
        error: null,
        currentPage: 1,
        itemsPerPage: 5
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload,
                state.currentPage = 1;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        }).addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false,
                state.data = action.payload,
                state.error = null;
        }).addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false,
                state.error = action.payload
        }).addCase(updateUserBlockStatus.fulfilled, (state, action) => {
            const updateUser = action.payload;
            state.data = state.data.map(user => user._id === updateUser._id ? updateUser : user)
        }).addCase(deleteUser.fulfilled, (state, action) => {
            state.data = state.data.filter(user => user._id !== action.payload)
        }).addCase(editUser.fulfilled, (state, action) => {
            const updatedUser = action.payload
            state.data = state.data.map(user => user._id === updatedUser._id ? updatedUser : user)
        }).addCase(createUser.fulfilled, (state, action) => {
            state.loading = false,
                state.data = [...state.data, action.payload?.user]
        }).addCase(createUser.pending, (state) => {
            state.loading = true
        }).addCase(createUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

// const selecteUserState = (state)=> state.users;

export const selectFilteredUsers = createSelector(
    [
        state => state.users.data,
        state => state.users.searchQuery
    ],
    (data, searchQuery) => {
        if (!Array.isArray(data)) {
            return [];
        }

        return data.filter(user =>
            user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
);

export const selectPaginatedUsers = createSelector(
    [
        selectFilteredUsers,
        state => state.users.currentPage,
        state => state.users.itemsPerPage
    ],
    (filteredUsers, currentPage, itemsPerPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
    }
);

export const selectTotalPages = createSelector(
    [
        selectFilteredUsers,
        state => state.users.itemsPerPage
    ],
    (filteredUsers, itemsPerPage) => {
        return Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
    }
);

export const { setCurrentPage, setSearchQuery } = userSlice.actions
export default userSlice.reducer