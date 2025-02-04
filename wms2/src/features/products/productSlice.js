import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    isLoading: true,
    meta: { current_page: 1, per_page: 10, total: 0, last_page: 1 },
    sort_by: [{ actual: "product_code", show: "Product Code", active: true },
    { actual: "ws_code", show: "Wondersoft Code", active: false },
    { actual: "name", show: "Product Name", active: false },
    { actual: "created", show: "Created At", active: false },
    { actual: "modified", show: "Updated At", active: false }
    ],
    asc: true,
    search_by: [
        {actual: "product_code", show: "Product Code", active: true},
        {actual: "ws_code", show: "Wondersoft Code", active: false},
        {actual: "name", show: "Product Name", active: false},
        {actual: "manufacturer", show: "Manufacturer", active: false},
    ],
    search_key: "",
};

export const productSliceReducer = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchProducts: (state, action) => {

            switch (action.payload.type) {
                case "pageChange":
                    return {
                        ...state,
                        meta: { ...state.meta, current_page: action.payload.payload.page },
                        sort_by: action.payload.payload.sort_by,
                        search_by: action.payload.payload.search_by,
                        search_key: action.payload.payload.search_key,
                        asc: action.payload.payload.asc,
                        isLoading: true,
                    };
                default:
                    return state;
            }
        },
        setProducts: (state, action) => {
            state.products = action.payload.products;
            state.meta = action.payload?.meta;
            state.isLoading = false;
        },
        setProductsError: (state) => {
            return { ...state, isLoading: false };
        },
        setAsc: (state, action) => {
            return { ...state, asc: action.payload };
        },
        setSortBy: (state, action) => {
            return { ...state, sort_by: action.payload };
        },
        setSearchKey: (state, action) => {
            return { ...state, search_key: action.payload};
        },
        setSearchBy: (state, action) => {
            return { ...state, search_by: action.payload};
        }
    },
});

export const
    {
        fetchProducts,
        setProducts,
        setProductsError,
        setAsc,
        setSortBy,
        setSearchKey,
        setSearchBy
    } = productSliceReducer.actions;
export const productReducer = productSliceReducer.reducer;