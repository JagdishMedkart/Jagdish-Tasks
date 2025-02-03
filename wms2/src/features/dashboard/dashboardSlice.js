import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    tabs: [],
    isLoading: true,
};

export const dashboardSliceReducer = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setTabs: (state, action) => {
            state.isLoading = true;
        }
    },
});

export const
    { 
        setTabs
    } = dashboardSliceReducer.actions;
export const dashboardReducer = dashboardSliceReducer.reducer;