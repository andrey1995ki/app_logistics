import {AsyncSetAddress} from "./address.model";
import {ASYNC_SET_ADDRESS} from "./address.reducer";

export const AsyncSetAddressList = (address: string): AsyncSetAddress => ({type: ASYNC_SET_ADDRESS, address})
