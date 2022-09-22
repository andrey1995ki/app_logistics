import {ASYNC_SET_ADDRESS, SEARCH_ADDRESS, SET_ADDRESS} from "./address.reducer";
import {AddressList, AsyncSetAddress, SearchAddress, SetAddress} from "./address.model";
import {call, put, takeEvery} from 'redux-saga/effects'
import {AddressApi} from "../../api/AddressApi";

export const loadingAddressList = (searchAddress: boolean): SearchAddress => ({
    type: SEARCH_ADDRESS,
    searchAddress
})
export const setAddressList = (addressList: undefined | Array<AddressList>): SetAddress => ({
    type: SET_ADDRESS,
    addressList
})

export function* getAddressList(payload: AsyncSetAddress) {
    yield put(loadingAddressList(true))
    try {
        let {data} = yield call(AddressApi.getAddress, payload.address)
        yield put(setAddressList(data.suggestions))
    } catch (e) {
        yield put(loadingAddressList(false))
    }
}

export function* AddressWatcher() {
    yield takeEvery(ASYNC_SET_ADDRESS, getAddressList)
}