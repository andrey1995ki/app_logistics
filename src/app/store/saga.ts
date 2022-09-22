import createSagaMiddleware from "redux-saga";
import {all} from 'redux-saga/effects'
import {AppWatcher} from "./app/app.actions";
import {AddressWatcher} from "./address/address.actions";

export const sagaMiddleware = createSagaMiddleware()

export function* rootWatcher(){
    yield all([AppWatcher(),AddressWatcher()])
}