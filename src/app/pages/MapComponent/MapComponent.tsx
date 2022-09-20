import React, {FC, memo} from 'react';

import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {RoutingLayer} from "./RoutingLayer";
import {Spin} from "antd";
import {useSelector} from "react-redux";
import {AppSelector} from "../../store/app/app.selector";

export const MapComponent: FC = memo(() => {
    const {loading,initialCoordinates,currentRouting} = useSelector(AppSelector)
    return (
        <Spin spinning={loading}>
            <MapContainer center={initialCoordinates} zoom={10}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    currentRouting && <RoutingLayer/>
                }
                {
                    currentRouting?.map((points,index)=>
                        <Marker position={points.point} key={index}>
                            <Popup>
                                {points.title} <br/> {points.description}
                            </Popup>
                        </Marker>
                    )
                }
            </MapContainer>
        </Spin>
    );
})