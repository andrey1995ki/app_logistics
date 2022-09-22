import {ASYNC_SET_ADDRESS, SEARCH_ADDRESS, SET_ADDRESS} from "./address.reducer";

export interface AddressInitialState {
    searchAddress:boolean
    addressList: undefined | Array<AddressList>
}
export interface AddressList {
    value:string
    unrestricted_value:string
    data: AddressListData
}
export interface AddressListData{
    geo_lat:string
    geo_lon:string
}
export interface SearchAddress {
    type: typeof SEARCH_ADDRESS
    searchAddress: boolean
}

export interface SetAddress {
    type: typeof SET_ADDRESS
    addressList: undefined | Array<AddressList>
}
export interface AsyncSetAddress {
    type: typeof ASYNC_SET_ADDRESS
    address: string
}

export type AddressActions = SearchAddress & SetAddress