import { takeEvery, put, call } from "redux-saga/effects";
import apiClient from "@/axios";
import { fetchProducts, setProducts, setProductsError } from "./productSlice";

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
        console.log("action type = ", action.payload.type);
        if(action.payload.type === "pageChange") {
            current_page = action.payload.payload.page;
            token = action.payload.payload.token;
            asc = action.payload.payload.asc;
            searchkey = action.payload.payload.search_key;
            if(asc === true) {
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
        }
        else if(action.payload.type === "sortBy") {
            token = action.payload.payload.token;
            sortby = action.payload.payload.sort_by.filter((item) => item.active === true);
            console.log("sorting by = ", sortby);
            console.log("sort by = ", sortby);
            sortby = sortby[0].actual;
            console.log("sortby = ", sortby);
        }
        else if (action.payload.type === "sortType") {
            token = action.payload.payload.token;
            asc = action.payload.payload.asc;
            console.log("asc = ", asc);
            if(asc === true) {
                asc = "a";
            }
            else {
                asc = "d";
            }
        }
        const response = yield call(apiClient.get, `/api/v1/master/products/unpublished?${search}sort_by=${sortby},${asc}&page=${current_page}`, {
            headers: {
                Authorization: token
            }
        });

        console.log(response);

        yield put(setProducts(response.data));
    } catch (error) {
        console.error("Error fetching modules:", error);
        yield put(setProductsError());
    }
}

function* productSaga() {
    yield takeEvery(fetchProducts.type, getProducts);
}

export default productSaga;