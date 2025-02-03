import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    password: "",
    error: "",
    showPassword: "",
    isLoading: false,
    isAuthenticated: false,
    name: "",
    token: "",
};

export const authSliceReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        },
        setShowPassword: (state, action) => {
            state.showPassword = !state.showPassword;
        },
        loginRequest: (state) => {
            state.isLoading = true;
            state.error = "";
        },
        loginSuccess: (state) => {
            state.isLoading = false;
            state.isAuthenticated = true;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    },
});

export const
    { setEmail,
        setPassword,
        setErrorMessage,
        setShowPassword,
        loginRequest,
        loginSuccess,
        loginFailure,
        setName,
        setToken
    } = authSliceReducer.actions;
export const authReducer = authSliceReducer.reducer;