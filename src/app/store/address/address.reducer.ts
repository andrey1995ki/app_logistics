import {AddressActions, AddressInitialState} from "./address.model";

const prefix = "ADDRESS_DATA"

export const SEARCH_ADDRESS = `${prefix}/SEARCH_ADDRESS`
export const SET_ADDRESS = `${prefix}/SET_ADDRESS`
export const ASYNC_SET_ADDRESS = `${prefix}/ASYNC_SET_ADDRESS`

export const initialState: AddressInitialState = {
    searchAddress: false,
    addressList: undefined
}

export const AddressReducer = (state = initialState, actions: AddressActions): AddressInitialState => {
    switch (actions.type) {
        case SEARCH_ADDRESS:
            return {
                ...state,
                searchAddress: actions.searchAddress
            }
        case SET_ADDRESS:
            return {
                ...state,
                searchAddress: false,
                addressList: actions.addressList
            }
        default:
            return state
    }
}