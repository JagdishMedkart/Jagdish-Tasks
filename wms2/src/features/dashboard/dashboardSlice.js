import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modules: "",
    isLoading: true,
};

export const dashboardSliceReducer = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        fetchModules: (state, action) => {
            state.isLoading = true; // Indicate loading
        },
        setModules: (state, action) => {
            state.modules = [...action.payload];
            state.isLoading = false;
        },
        setModulesError: (state) => {
            state.isLoading = false;
        }
    },
});

export const
    { 
        fetchModules,
        setModules,
        setModulesError
    } = dashboardSliceReducer.actions;
export const dashboardReducer = dashboardSliceReducer.reducer;