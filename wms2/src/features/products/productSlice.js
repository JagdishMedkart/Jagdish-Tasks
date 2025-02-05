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
    filters: [
        {actual: "is_assured", show: "isAssured", values: ["Yes", "No"], active: "false"},
        {actual: "is_refrigerated", show: "isRefrigerated", values: ["Yes", "No"], active: "false"},
        {actual: "publish_status", show: "Status", values: ["Published", "Unpublished", "Draft"], active: "false"},
        {actual: "manufacturers", pref: "manufacturer", show: "Manufacturer", active: "false" },
        {actual: "molecules", pref: "combination", show: "Combination", active: "false" }
    ],
    manufacturers: {text: "", values: []},
    molecules: {text: "", values: []},
    pageChanged: false,
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
                        filters: action.payload.payload.filters,
                        isLoading: true,
                        pageChanged: action.payload.payload.pageChanged
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
        },
        setFilters: (state, action) => {
            return { ...state, filters: action.payload};
        },
        fetchManufacturers: (state, action) => {
            return {
                ...state, 
                manufacturers: { ...state.manufacturers, text: action?.payload?.text ? action.payload.text : "" },
            }
        },
        fetchMolecules: (state, action) => {
            return {
                ...state,
                molecules: { ...state.molecules, text: action?.payload?.text ? action.payload.text : "" },
            }
        },
        setManufacturers: (state, action) => {
            return {
                ...state,
                manufacturers: { ...state.manufacturers, values: action.payload }
            };
        },
        setMolecules: (state, action) => {
            return {
                ...state,
                molecules: { ...state.molecules, values: action.payload }
            };
        },
        setManufacturerText: (state, action) => {
            return {
                ...state,
                manufacturers: { ...state.manufacturers, text: action.payload }
            }
        },
        setMoleculesText: (state, action) => {
            return {
                ...state,
                molecules: { ...state.molecules, text: action.payload }
            }
        },
        setPageChanged: (state, action) => {
            return {
                ...state,
                pageChanged: action.payload
            }
        },
        setMeta: (state, action) => {
            return {
                ...state,
                meta: { ...state.meta, current_page: action.payload}
            }
        },
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
        setSearchBy,
        setFilters,
        fetchManufacturers,
        fetchMolecules,
        setManufacturers,
        setMolecules,
        setManufacturerText,
        setMoleculesText,
        setPageChanged,
        setMeta
    } = productSliceReducer.actions;
export const productReducer = productSliceReducer.reducer;