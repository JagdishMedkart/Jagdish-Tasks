import { createSlice } from "@reduxjs/toolkit";

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
    manufacturer: { text: "", values: [] },
    b2c: { text: "", values: [] },
    selectedB2C: "",
    molecules: { text: "", selected: [], values: [] }
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
        fetchManu: (state, action) => {
            return {
                ...state,
                manufacturer: { ...state.manufacturer, text: action?.payload?.text ? action.payload.text : "" },
            }
        },
        setManufacturers: (state, action) => {
            return {
                ...state,
                manufacturer: { ...state.manufacturer, values: action.payload }
            };
        },
        setManufacturerText: (state, action) => {
            return {
                ...state,
                manufacturer: { ...state.manufacturer, text: action.payload }
            }
        },
        fetchB2C: (state, action) => {
            return {
                ...state,
                b2c: { ...state.b2c, text: action?.payload?.text ? action.payload.text : "" },
            }
        },
        setB2C: (state, action) => {
            return {
                ...state,
                b2c: { ...state.b2c, values: action.payload }
            };
        },
        setB2CText: (state, action) => {
            return {
                ...state,
                b2c: { ...state.b2c, text: action.payload }
            }
        },
        setSelectedB2C: (state, action) => {
            return {
                ...state,
                selectedB2C: action.payload
            }
        },
        fetchMolecules: (state, action) => {
            return {
                ...state,
                molecules: { ...state.molecules, text: action?.payload?.text ? action.payload.text : "" },
            }
        },
        setMolecules: (state, action) => {
            return {
                ...state,
                molecules: { ...state.molecules, values: action.payload }
            };
        },
        setMoleculesText: (state, action) => {
            return {
                ...state,
                molecules: { ...state.molecules, text: action.payload }
            }
        },
    },
});

export const
    {
        fetchMasterData,
        setMasterData,
        fetchManu,
        setManufacturers,
        setManufacturerText,
        fetchB2C,
        setB2C,
        setB2CText,
        setSelectedB2C,
        fetchMolecules,
        setMolecules,
        setMoleculesText
    } = addProductSliceReducer.actions;
export const addProductReducer = addProductSliceReducer.reducer;