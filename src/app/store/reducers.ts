import {combineReducers} from "redux";
import {AppReducer as app} from "./app/app.reducer";


export const reducers = combineReducers({
    app,
})