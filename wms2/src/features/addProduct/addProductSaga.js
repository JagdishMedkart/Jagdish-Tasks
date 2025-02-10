import { takeEvery, put, call } from "redux-saga/effects";
import apiClient from "@/axios";
import { fetchManu, fetchMasterData, setMasterData, setManufacturers } from "./addProductSlice";

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
        // yield put(setProductsError());
    }
}

function* addProductSaga() {
    yield takeEvery(fetchMasterData.type, getMasterData);
    yield takeEvery(fetchManu.type, getManufacturers);
}

export default addProductSaga;