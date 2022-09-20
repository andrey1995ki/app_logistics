import React, {FC, memo, useState} from 'react';
import {AutoComplete, Descriptions, List} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {ListItemProps} from "../ApplicationsComponent.model";
import style from '../ApplicationsComponent.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {asyncSetCurrentApp, asyncUpdateRouting} from "../../../store/app/app.actions";
import moment from "moment";
import {AddressSelector} from "../../../store/address/address.selector";
import {AsyncSetAddressList, setAddressList} from "../../../store/address/address.actions";
import {AddressList} from "../../../store/address/address.model";
import {LatLngExpression} from "leaflet";

const {ContentBlock} = style

export const ListItem: FC<ListItemProps> = memo(({id, title, description, currentId, applicationsDate, routing}) => {
    const [editableRoute, setEditableRoute] = useState<{ id: string, address: string } | null>(null)
    const {addressList} = useSelector(AddressSelector)
    const dispatch = useDispatch()
    const selectedItems = () => {
        if (id === currentId) {
            dispatch(asyncSetCurrentApp(undefined))
        } else {
            dispatch(asyncSetCurrentApp(id))
        }
    }
    const searchingAddress = (value: string) => {
        if (value.length >= 3) {
            dispatch(AsyncSetAddressList(value))
        }
    }
    const selectAddress = () => {
        dispatch(setAddressList(undefined))
    }
    const renderItem = (address: AddressList) => ({
        value: `${address.value}; ${address.data.geo_lat},${address.data.geo_lon}`,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {address.value}
            </div>
        ),
    });
    const updateRouting = (value: string) => {
        console.log(value, id, editableRoute);
        if (editableRoute && value !== editableRoute?.address) {
            dispatch(asyncUpdateRouting(
                id,
                editableRoute.id,
                value.split('; ')[1].split(',').map(coor => parseFloat(coor)) as LatLngExpression,
                value.split('; ')[0]
            ))
        }
        setEditableRoute(null)
    }
    return (
        <div>
            <List.Item className={id === currentId ? 'CurrentItem' : ''} onClick={selectedItems}>
                <List.Item.Meta
                    title={<a href="https://ant.design">{title}</a>}
                    description={`${description}`}
                />
                <div>
                    {
                        id === currentId
                            ? <DownOutlined/>
                            : <UpOutlined/>
                    }

                </div>
            </List.Item>
            <div style={id === currentId ? {display: "block"} : {display: "none"}} className={ContentBlock}>
                <Descriptions column={1}>
                    <Descriptions.Item label="Дата маршрута">
                        <div>{moment(applicationsDate).format('LLL')}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Начальная точка маршрута">
                        {
                            editableRoute?.id === routing[0].id
                                ? <AutoComplete
                                    autoFocus
                                    onBlur={(e: any) => updateRouting(e.target.value)}
                                    options={addressList?.map(address => renderItem(address))}
                                    onSearch={searchingAddress}
                                    onSelect={selectAddress}
                                    defaultValue={routing[0].address}
                                    style={{width: "100%"}}
                                >
                                </AutoComplete>
                                : <div onDoubleClick={() => {
                                    setEditableRoute({id: routing[0].id, address: routing[0].address})
                                }}>{routing[0].address}</div>
                        }
                    </Descriptions.Item>
                    {
                        routing
                            .filter((item, index) => index !== 0 && index !== routing.length - 1)
                            .map((rout, index) =>
                                <Descriptions.Item label={`Промежуточная тчка маршрута ${index + 1}`} key={index}>
                                    {
                                        editableRoute?.id === rout.id
                                            ? <AutoComplete
                                                autoFocus
                                                onBlur={(e: any) => updateRouting(e.target.value)}
                                                options={addressList?.map(address => renderItem(address))}
                                                onSearch={searchingAddress}
                                                onSelect={selectAddress}
                                                defaultValue={rout.address}
                                                style={{width: "100%"}}
                                            >
                                            </AutoComplete>
                                            : <div onDoubleClick={() => {
                                                setEditableRoute({id: rout.id, address: rout.address})
                                            }}>{rout.address}</div>
                                    }
                                </Descriptions.Item>
                            )
                    }
                    <Descriptions.Item label="Конечная точка маршрута">
                        {
                            editableRoute?.id === routing[routing.length - 1].id
                                ? <AutoComplete
                                    autoFocus
                                    onBlur={(e: any) => updateRouting(e.target.value)}
                                    options={addressList?.map(address => renderItem(address))}
                                    onSearch={searchingAddress}
                                    onSelect={selectAddress}
                                    defaultValue={routing[routing.length - 1].address}
                                    style={{width: "100%"}}
                                >
                                </AutoComplete>
                                : <div onDoubleClick={() => {
                                    setEditableRoute({
                                        id: routing[routing.length - 1].id,
                                        address: routing[routing.length - 1].address
                                    })
                                }}>{routing[routing.length - 1].address}</div>
                        }
                    </Descriptions.Item>
                </Descriptions>

            </div>
        </div>
    );
})