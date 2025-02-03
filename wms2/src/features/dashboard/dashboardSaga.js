import { takeEvery, put, call } from "redux-saga/effects";
import apiClient from "@/axios";
import { setTabs } from "./dashboardSlice";

function* getTabs(action) {
    try {
        console.log("action of getTabs = ", action);
        const response = yield call(apiClient.get, "/api/v1/master/user/current-user/data", {
            headers: {
                Authorization: action.payload
            }
        });

        console.log(response);

        let permissions = response.data.user.permissions;
        console.log(permissions);

        // yield put(loginSuccess());
        // yield put(setName(name));
        // router.push("/dashboard");
    } catch (error) {
        yield put(loginFailure(error.response?.data?.message || "Login failed"));
        console.error("Login error:", error);
    }
}

function* dashboardSaga() {
    yield takeEvery(setTabs.type, getTabs);
}

export default dashboardSaga;