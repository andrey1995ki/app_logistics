import React, {FC, memo} from 'react';

import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {RoutingLayer} from "./RoutingLayer";
import {Spin} from "antd";
import {useSelector} from "react-redux";
import {AppSelector} from "../../store/app/app.selector";

export const MapComponent: FC = memo(() => {
    const {loadingMap, initialCoordinates, currentApplication} = useSelector(AppSelector)
    const getRouting = () => {
        if (currentApplication && !loadingMap) {
            return (
                <>
                    <RoutingLayer/>
                    {
                        currentApplication.currentRouting.map((points, index) =>
                            <Marker position={points.point} key={index}>
                                <Popup>
                                    {points.address} <br/> {points.description}
                                </Popup>
                            </Marker>
                        )
                    }
                </>
            )
        }
    }
    return (
        <Spin spinning={loadingMap}>
            <MapContainer center={initialCoordinates} zoom={10}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {getRouting()}
            </MapContainer>
        </Spin>
    );
})