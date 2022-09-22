import React, {FC, memo} from 'react';
import {AddressItem} from "../../../utils/Address/AddressItem";
import {searchingAddress, selectAddress} from "../../../utils/Address/AddressUtils";
import {AutoComplete, Form} from "antd";
import {useDispatch} from "react-redux";
import {SearchAddressProps} from "../CreateRoutComponent.model";

export const SearchAddress: FC<SearchAddressProps> = memo(({addressList, label, name, message}) => {
    const dispatch = useDispatch()
    return (
        <Form.Item
            label={label}
            name={name}
            rules={[{required: true, message: message}]}
        >
            <AutoComplete
                options={addressList?.map(address => AddressItem(address))}
                onSearch={(value) => searchingAddress(value, dispatch)}
                onSelect={() => selectAddress(dispatch)}
            />
        </Form.Item>
    );
})