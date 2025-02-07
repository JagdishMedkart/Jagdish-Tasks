import { takeEvery, put, call } from "redux-saga/effects";
import apiClient from "@/axios";
import { fetchMasterData, setMasterData } from "./addProductSlice";

function* getMasterData(action) {
    try {
        console.log("action = ", action);
        let token = action.payload;
        const response = yield call(apiClient.get, `/api/v1/master-data/productMasterData`, {
            headers: {
                Authorization: token
            }
        });

        console.log(response);
        yield put(setMasterData(response.data.productMasterData));
    } catch (error) {
        console.error("Error fetching modules:", error);
        yield put(setProductsError());
    }
}

function* addProductSaga() {
    yield takeEvery(fetchMasterData.type, getMasterData);
}

export default addProductSaga;