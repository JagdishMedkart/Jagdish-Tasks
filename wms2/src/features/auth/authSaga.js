import { takeEvery, put, call } from "redux-saga/effects";
import apiClient from "@/axios";
import { loginRequest, loginSuccess, loginFailure, setName } from "./authSlice";
import { setToken } from "./authSlice";

function* doLogin(action) {
    try {
        const { email, password } = action.payload;

        console.log(email);
        console.log(password);

        const response = yield call(apiClient.post, "/api/v1/login", {
            email,
            password,
            mac_address: "1CC10CAD27C6",
        });

        console.log(response);

        const token = "Bearer " + response.data.user.auth.token;
        console.log("token = ", token);
        // localStorage.setItem("token", token);

        const name = response.data.user.profile.name;

        console.log("name = ", name);
        yield put(setToken(token));
        yield put(setName(name));
        yield put(loginSuccess());
        // router.push("/dashboard");
    } catch (error) {
        yield put(loginFailure(error.response?.data?.message || "Login failed"));
        console.error("Login error:", error);
    }
}

function* authSaga() {
    yield takeEvery(loginRequest.type, doLogin);
}

export default authSaga;