import { takeLatest, fork, call, put } from "redux-saga/effects";

import {ADD_TO_CART, FETCH_CART} from "../actionTypes";
import {addToCartFailure, addToCartSuccess, fetchCartFailure, fetchCartSuccess} from "./actions";
import * as cartApi from '../../libs/cart/api';

export function* fetchCart() {
    try {
        const cart = yield call(cartApi.fetch);
        yield put(fetchCartSuccess(cart));
    } catch(error) {
        yield put(fetchCartFailure(error));
    }
}

export function* addToCart(action) {
    try {
        const cart = yield call(cartApi.addToCart, action.productId, action.quantity);
        yield put(addToCartSuccess(cart));
    } catch(error) {
        yield put(addToCartFailure(error));
    }
}

export function* watchFetchCart() {
    yield takeLatest(FETCH_CART, fetchCart)
}

export function* watchAddToCart() {
    yield takeLatest(ADD_TO_CART, addToCart)
}

export default function* () {
    yield fork(watchFetchCart);
    yield fork(watchAddToCart);
}