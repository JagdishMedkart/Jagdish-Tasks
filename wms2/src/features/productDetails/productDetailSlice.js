import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product_type: "Goods",
    can_sell_online: false,
    is_rx_required: true,
    is_chronic: true,
    is_refrigerated: false,
    is_hidden_from_alternate_products: true,
    is_discontinued: false,
    is_active: true,
    is_banned: false,
    is_assured: true,
    manufacturer: {
        id: 0,
        name: ""
    },
    sales_category: { b2c_category: "" },
    combination: {
        molecules: []
    }
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
            const value = isNaN(action.payload.value) ? action.payload.value : Number(action.payload.value);
            temp[keys[keys.length - 1]] = value;
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
                is_hidden_from_alternate_products: true,
                is_discontinued: false,
                is_banned: false,
                is_assured: true,
                is_active: true,
                manufacturer: {
                    id: 0,
                    name: ""
                },
                sales_category: { b2c_category: "" },
                combination: {
                    molecules: []
                }
            }
        },
        setManu: (state, action) => {
            return {
                ...state,
                manufacturer: { id: action.payload.id, name: action.payload.name }
            }
        },
        setB2CFinal: (state, action) => {
            return {
                ...state,
                sales_category: {
                    ...state.sales_category,
                    b2c_category: action.payload.id
                }
            }
        },
        setMolecules: (state, action) => {
            state.combination.molecules = action.payload;
        },

        addMolecule: (state, action) => {
            const { id, name, ...rest } = action.payload;

            const newMolecule = {
                molecule_id: id,
                molecule_name: name,
                ...rest
            }

            if (!state.combination.molecules.some(m => m.molecule_id === newMolecule.molecule_id)) {
                state.combination.molecules.push(newMolecule);
            }
        },
        removeMolecule: (state, action) => {
            state.combination.molecules = state.combination.molecules.filter(
                (molecule) => molecule.molecule_id !== action.payload
            );
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
        setManu,
        setB2CFinal,
        setMolecules,
        addMolecule,
        removeMolecule
    } = productDetailSliceReducer.actions;
export const productDetailReducer = productDetailSliceReducer.reducer;