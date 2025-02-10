import { takeEvery, put, call } from "redux-saga/effects";
import apiClient from "@/axios";
import { fetchProductDetails, setFullDetails } from "./productDetailSlice";

function* getProductDetails(action) {
    try {
        console.log("action = ", action);
        let token = action.payload.token;
        const response = yield call(apiClient.get, `/api/v1/master/products/unpublished/${action.payload.product_id}`, {
            headers: {
                Authorization: token,
                Location: 1
            }
        });

        console.log(response);
        yield put(setFullDetails(response.data.product));
    } catch (error) {
        console.error("Error fetching modules:", error);
        // yield put(setProductsError());
    }
}

function* productDetailSaga() {
    yield takeEvery(fetchProductDetails.type, getProductDetails);
}

export default productDetailSaga;