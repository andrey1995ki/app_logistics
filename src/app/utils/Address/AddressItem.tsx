import {AddressList} from "../../store/address/address.model";
import React from "react";
import style from './Address.module.scss'

const {AddressItemField} = style

export const AddressItem = (address: AddressList) => ({
    value: `${address.value}; ${address.data.geo_lat},${address.data.geo_lon}`,
    label: (
        <div className={AddressItemField}>
            {address.value}
        </div>
    ),
})