import {setAddressList} from "../../store/address/address.actions";
import {Dispatch} from "redux";
import {AsyncSetAddressList} from "../../store/address/address.asyncActions";

export const selectAddress = (dispatch: Dispatch) => {
    dispatch(setAddressList(undefined))
}

export const searchingAddress = (value: string, dispatch: Dispatch) => {
    if (value.length >= 3) {
        dispatch(AsyncSetAddressList(value))
    }
}
