import React, {FC, memo, useState} from 'react';
import {Descriptions, List} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {editableRouteState, ListItemProps} from "../ApplicationsComponent.model";
import style from '../ApplicationsComponent.module.scss'
import {useDispatch} from "react-redux";
import moment from "moment";
import {LatLngExpression} from "leaflet";
import {ChangeAddress, DefaultField} from "./AddressFields";
import {selectedItems} from "../utils/ChangeAddressUtils";
import {asyncUpdateRouting} from "../../../store/app/app.asyncActions";

const {ContentBlock, CurrentItem, CurrentItemTitle, CurrentItemTitleActive} = style

export const ListItem: FC<ListItemProps> = memo(({id, title, description, currentId, applicationsDate, routing}) => {
    const [editableRoute, setEditableRoute] = useState<editableRouteState>(null)
    const dispatch = useDispatch()
    const updateRouting = (value: string) => {
        if (editableRoute && value !== editableRoute?.address) {
            dispatch(asyncUpdateRouting(
                id,
                editableRoute.id,
                value.split('; ')[1]
                    .split(',')
                    .map(coordinate => parseFloat(coordinate)) as LatLngExpression,
                value.split('; ')[0]
            ))
        }
        setEditableRoute(null)
    }
    return (
        <div>
            <List.Item
                className={id === currentId ? CurrentItem : ''}
                onClick={() => selectedItems(id, currentId, dispatch)}
            >
                <List.Item.Meta
                    title={
                        <span className={id === currentId ? CurrentItemTitleActive : CurrentItemTitle}>{title}</span>
                    }
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
                                ? <ChangeAddress address={routing[0].address} updateRouting={updateRouting}/>
                                : <DefaultField rout={routing[0]} setEditableRoute={setEditableRoute}/>
                        }
                    </Descriptions.Item>
                    {
                        routing
                            .filter((item, index) => index !== 0 && index !== routing.length - 1)
                            .map((rout, index) =>
                                <Descriptions.Item label={`Промежуточная тчка маршрута ${index + 1}`} key={index}>
                                    {
                                        editableRoute?.id === rout.id
                                            ? <ChangeAddress address={rout.address} updateRouting={updateRouting}/>
                                            : <DefaultField rout={rout} setEditableRoute={setEditableRoute}/>
                                    }
                                </Descriptions.Item>
                            )
                    }
                    <Descriptions.Item label="Конечная точка маршрута">
                        {
                            editableRoute?.id === routing[routing.length - 1].id
                                ? <ChangeAddress address={routing[routing.length - 1].address}
                                                 updateRouting={updateRouting}/>
                                : <DefaultField rout={routing[routing.length - 1]} setEditableRoute={setEditableRoute}/>
                        }
                    </Descriptions.Item>
                </Descriptions>

            </div>
        </div>
    );
})