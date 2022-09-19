import {reducers} from "./reducers";
import {createStore} from "redux";

export type RootReducer = ReturnType<typeof reducers>

export const store = createStore(reducers)

// @ts-ignore
window.store = store