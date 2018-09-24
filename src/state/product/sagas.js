import { takeLatest, fork, call, put } from "redux-saga/effects";

import {FETCH_PRODUCTS} from "../actionTypes";
import * as productApi from '../../libs/product/api';
import {fetchProductsFailure, fetchProductsSuccess} from "./actions";

export function* fetchProducts(action) {
    try {
        const products = yield call(productApi.fetchAll);
        yield put(fetchProductsSuccess(products));
    } catch(error) {
        yield put(fetchProductsFailure(error));
    }
}

export function* watchFetchProducts() {
    yield takeLatest(FETCH_PRODUCTS, fetchProducts);
}

export default function* () {
    yield fork(watchFetchProducts);
}