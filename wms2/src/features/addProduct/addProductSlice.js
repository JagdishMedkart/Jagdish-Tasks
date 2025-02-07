import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    product_type: [],
    dosage_form: [],
    package_type: [],
    uom: [],
    schedule_type_code: [],
    gst_type: [],
    b2b_category: [],
    sales_trend_category: [],
    product_return_type: [],
    product_return_details: [],
    mis_reporting_category: [],
    mis_warehouse_category: [],
};

export const addProductSliceReducer = createSlice({
    name: "addProducts",
    initialState,
    reducers: {
        fetchMasterData: (state, action) => {
            return state;
        },
        setMasterData: (state, action) => {
            state.product_type = action.payload.product_type;
            state.dosage_form = action.payload.dosage_form;
            state.package_type = action.payload.package_type;
            state.uom = action.payload.uom;
            state.schedule_type_code = action.payload.schedule_type_code;
            state.gst_type = action.payload.gst_type;
            state.b2b_category = action.payload.b2b_category;
            state.sales_trend_category = action.payload.sales_trend_category;
            state.product_return_details = action.payload.product_return_details;
            state.product_return_type = action.payload.product_return_type;
            state.mis_reporting_category = action.payload.mis_reporting_category;
            state.mis_warehouse_category = action.payload.mis_warehouse_category;
        },
    },
});

export const
    {
        fetchMasterData, 
        setMasterData
    } = addProductSliceReducer.actions;
export const addProductReducer = addProductSliceReducer.reducer;