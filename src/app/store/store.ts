import {reducers} from "./reducers";
import {applyMiddleware, createStore} from "redux";
import {rootWatcher, sagaMiddleware} from "./saga";

export type RootReducer = ReturnType<typeof reducers>
export const store = createStore(reducers,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootWatcher)
// @ts-ignore
window.store = store