import { takeEvery, put, call } from "redux-saga/effects";
import apiClient from "@/axios";
import { fetchManufacturers, fetchMolecules, fetchProducts, setProducts, setProductsError, setManufacturers, setMolecules, setPageChanged } from "./productSlice";

function* getProducts(action) {
    try {
        console.log("action = ", action);
        let token = action.payload;
        let current_page = 1;
        let sortby = "product_code";
        let asc = 'a';
        let search = "";
        let searchkey = "";
        let searchby = "product_code";
        let filter = "";
        console.log("action type = ", action.payload.type);
        if (action.payload.type === "pageChange") {
            current_page = action.payload.payload.page;
            token = action.payload.payload.token;
            asc = action.payload.payload.asc;
            searchkey = action.payload.payload.search_key;
            let filters = action.payload.payload.filters;
            let pageChanged = action.payload.payload.pageChanged;
            if(!pageChanged) {
                current_page = 1;
            }
            if (asc === true) {
                asc = "a";
            }
            else {
                asc = "d";
            }
            searchby = action.payload.payload.search_by.filter((item) => item.active === true);
            console.log("searchby = ", searchby);
            searchby = searchby[0]?.actual;
            sortby = action.payload.payload.sort_by.filter((item) => item.active === true);
            console.log("sorting by = ", sortby);
            console.log("sort by = ", sortby);
            sortby = sortby[0]?.actual;
            console.log("asc = ", asc);
            console.log("current_page = ", current_page);
            console.log("token = ", token);
            console.log("sortby = ", sortby);
            console.log("search by = ", searchby);
            search = searchkey?.length > 0 ? `search=${searchkey},${searchby}&` : "";
            filters.map((item, key) => {
                if (item.active != "false") {
                    filter += (item?.pref ? item.pref : item.actual) + "=" + (item?.id ? item.id : item.active) + "&";
                }
            })
            console.log("filter = ", filter);
        }
        const response = yield call(apiClient.get, `/api/v1/master/products/unpublished?${search}${filter}sort_by=${sortby},${asc}&page=${current_page}`, {
            headers: {
                Authorization: token
            }
        });

        console.log(response);

        yield put(setPageChanged(false));
        yield put(setProducts(response.data));
    } catch (error) {
        console.error("Error fetching modules:", error);
        yield put(setProductsError());
    }
}

function* getManufacturers(action) {
    try {
        console.log("action = ", action);
        let token = action.payload.token;
        let search = "";
        let text = action.payload.text;
        search = text?.length > 0 ? `?search=${text},name` : "";
        const response = yield call(apiClient.get, `/api/v1/master/manufacturers${search}`, {
            headers: {
                Authorization: token
            }
        })
        console.log("Response of getManufacturers = ", response);
        yield put(setManufacturers(response.data.manufacturers));
    }
    catch (error) {
        console.error("Error fetching manufacturers", error);
    }
}

function* getMolecules(action) {
    try {
        console.log("action = ", action);
        let token = action.payload.token;
        let search = "";
        let text = action.payload.text;
        search = text?.length > 0 ? `?search=${text},name` : "";
        const response = yield call(apiClient.get, `/api/v1/master/molecules${search}`, {
            headers: {
                Authorization: token
            }
        })
        console.log("Response of getMolecules = ", response);
        yield put(setMolecules(response.data.molecules));
    }
    catch (error) {
        console.error("Error fetching manufacturers", error);
    }
}

function* productSaga() {
    yield takeEvery(fetchProducts.type, getProducts);
    yield takeEvery(fetchManufacturers.type, getManufacturers);
    yield takeEvery(fetchMolecules.type, getMolecules);
}

export default productSaga;