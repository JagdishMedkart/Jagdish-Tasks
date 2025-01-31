import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../middleware/axios";
import { fetchProductsSuccess, fetchProductsFailure } from "./productSlice";

function* fetchProducts(action) {
  try {
    const response = yield call(apiClient.get, "/api/v1/master/products");
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export default function* productSaga() {
  yield takeLatest("products/fetchProducts", fetchProducts);
}