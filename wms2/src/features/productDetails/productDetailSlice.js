import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product_type: "Goods",
    can_sell_online: false,
    is_rx_required: true,
    is_chronic: true,
    is_refrigerated: false,
    manufacturer: {
        id: 0,
        name: ""
    },
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
                [action.payload.name]: action.payload.value
            }
        },
        updateData2: (state, action) => {
            const keys = action.payload.name.split(".");
            let temp = state;

            for (let i = 0; i < keys.length - 1; i++) {
                if (!temp[keys[i]] || typeof temp[keys[i]] !== "object") {
                    temp[keys[i]] = {};
                }
                temp = temp[keys[i]];
            }

            temp[keys[keys.length - 1]] = action.payload.value;
        },
        fetchProductDetails: (state, action) => {

        },
        setFullDetails: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        setInitData: (state, action) => {
            return {
                product_type: "Goods",
                can_sell_online: false,
                is_rx_required: true,
                is_chronic: true,
                is_refrigerated: false,
            }
        },
        setManu: (state, action) => {
            return {
                ...state,
                manufacturer: {id: action.payload.id, name: action.payload.name}
            }
        }
    },
});

export const
    {
        setProductDetails,
        setSelected,
        updateData,
        fetchProductDetails,
        setFullDetails,
        updateData2,
        setInitData,
        setManu
    } = productDetailSliceReducer.actions;
export const productDetailReducer = productDetailSliceReducer.reducer;