import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product_type: "Goods",
};

export const productDetailSliceReducer = createSlice({
    name: "productDetail",
    initialState,
    reducers: {
        setProductDetails: (state, action) => {
            state.product_type = action.payload;
        },
        setSelected: (state, action) => {
            state.selected = action.payload;
        },
        updateData: (state, action) => {
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        }
    },
});

export const
    {
        setProductDetails,
        setSelected,
        updateData
    } = productDetailSliceReducer.actions;
export const productDetailReducer = productDetailSliceReducer.reducer;