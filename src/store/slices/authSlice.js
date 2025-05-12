import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    users: [],
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state, action) => {
            state.users.push(action.payload);
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        login: (state, action) => {
            const userFound = state.users.find(
                (u) => u.email === action.payload.email && u.password === action.payload.password
            );
            if (userFound) {
                state.user = userFound;
                state.isAuthenticated = true;
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        updatePassword: (state, action) => {
            if (state.user) {
                state.user.password = action.payload;
            }
        },
    },
});

export const { register, login, logout, updatePassword } = authSlice.actions;
export default authSlice.reducer;
