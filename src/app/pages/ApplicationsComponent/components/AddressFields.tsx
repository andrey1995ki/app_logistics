import React, {FC, memo} from 'react';
import {AddressItem} from "../../../utils/Address/AddressItem";
import {searchingAddress, selectAddress} from "../../../utils/Address/AddressUtils";
import {AutoComplete} from "antd";
import {ChangeAddressProps, DefaultFieldProps} from "../ApplicationsComponent.model";
import {useDispatch, useSelector} from "react-redux";
import style from '../ApplicationsComponent.module.scss'
import {AddressSelector} from "../../../store/address/address.selector";

const {ChangeAddressField} = style

export const ChangeAddress: FC<ChangeAddressProps> = memo(({updateRouting, address}) => {
    const dispatch = useDispatch()
    const {addressList} = useSelector(AddressSelector)
    return (
        <AutoComplete
            autoFocus
            onBlur={(e: React.FocusEvent<any>) => updateRouting(e.target.value)}
            options={addressList?.map(address => AddressItem(address))}
            onSearch={(value) => searchingAddress(value, dispatch)}
            onSelect={() => selectAddress(dispatch)}
            defaultValue={address}
            className={ChangeAddressField}
        >
        </AutoComplete>
    );
})

export const DefaultField: FC<DefaultFieldProps> = memo(({setEditableRoute, rout}) => {
    return (
        <div
            onDoubleClick={() => {
                setEditableRoute({id: rout.id, address: rout.address})
            }}
        >
            {rout.address}
        </div>
    )
})