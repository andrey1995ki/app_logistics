import {RootReducer} from "../store";

export const AppSelector = (store: RootReducer) => {
    return store.app
}