import {combineReducers} from "redux";
import {AppReducer as app} from "./app/app.reducer";
import {AddressReducer as address} from "./address/address.reducer";


export const reducers = combineReducers({
    app,
    address
})