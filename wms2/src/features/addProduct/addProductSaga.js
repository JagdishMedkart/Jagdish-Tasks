import { takeEvery, put, call } from "redux-saga/effects";
import apiClient from "@/axios";
import { fetchManu, fetchMasterData, setMasterData, setManufacturers, fetchB2C, setB2C, fetchMolecules, setMolecules } from "./addProductSlice";

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
        let res = [];
        response?.data?.molecules?.map((molecule) => {
            const {id, name, ...rest} = molecule;
            const newObj = {
                molecule_id: id,
                molecule_name: name,
                ...rest
            };
            res.push(newObj);
        })
        console.error("newly created objects = ", res);
        yield put(setMolecules(res));
    }
    catch (error) {
        console.error("Error fetching manufacturers", error);
    }
}

function* getB2C(action) {
    try {
        console.log("action = ", action);
        let token = action.payload.token;
        let search = "";
        let text = action.payload.text;
        search = text?.length > 0 ? `?search=${text},category_name` : "";
        const response = yield call(apiClient.get, `/api/v1/master/b2c-template${search}&status=Active`, {
            headers: {
                Authorization: token
            }
        })
        console.log("Response of getB2C = ", response);
        yield put(setB2C(response.data.b2cPricing));
    }
    catch (error) {
        console.error("Error fetching manufacturers", error);
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
    yield takeEvery(fetchB2C.type, getB2C);
    yield takeEvery(fetchMolecules.type, getMolecules);
}

export default addProductSaga;