import {ASYNC_CREATED_APP, ASYNC_SET_APPLICATIONS, ASYNC_SET_CURRENT_APP, ASYNC_UPDATE_ROUTING} from "./app.reducer";
import {AsyncCreatedApp, AsyncUpdateRouting, RoutingBasicItems} from "./app.model";
import {LatLngExpression} from "leaflet";

export const asyncSetApplications = () => ({type: ASYNC_SET_APPLICATIONS})
export const asyncSetCurrentApp = (appId: string | undefined) => ({type: ASYNC_SET_CURRENT_APP, appId})

export const asyncCreatedApp = (
    title: string, description: string, applicationsDate: string, routingArr: Array<RoutingBasicItems>
): AsyncCreatedApp => ({
    type: ASYNC_CREATED_APP, title,
    description,
    applicationsDate,
    routingArr
})
export const asyncUpdateRouting = (appId: string,
                                   routingId: string,
                                   point: LatLngExpression,
                                   address: string): AsyncUpdateRouting => ({
    type: ASYNC_UPDATE_ROUTING,
    appId,
    routingId,
    point,
    address,
})