import {
    ASYNC_CREATED_APP, ASYNC_UPDATE_ROUTING,
    LOADING_APP,
    LOADING_MAP,
    SET_APPLICATIONS,
    SET_CURRENT_APP
} from "./app.reducer";
import {LatLngExpression} from "leaflet";

export interface AppInitialState {
    initialCoordinates: LatLngExpression
    loadingMap: boolean
    loadingApp: boolean
    applications: Array<ApplicationsItem>
    currentApplication: CurrentApplication | undefined
}

export interface ApplicationsItem {
    id: string
    applicationsDate: string
    title: string
    description: string
    routing: Array<RoutingItems>
}

export interface RoutingBasicItems {
    point: LatLngExpression
    address: string
    description: string
}

export interface RoutingItems extends RoutingBasicItems {
    id: string
    applicationId: string
}

export interface CurrentApplication {
    currentId: string,
    currentRouting: Array<RoutingItems>
}

export interface LoadingMap {
    type: typeof LOADING_MAP
    loadingMap: boolean
}

export interface LoadingApp {
    type: typeof LOADING_APP
    loadingApp: boolean
}

export interface SetApplications {
    type: typeof SET_APPLICATIONS
    applications: Array<ApplicationsItem>
}

export interface SetCurrentApp {
    type: typeof SET_CURRENT_APP
    applicationId: string | undefined
}

export interface AsyncCreatedApp {
    type: typeof ASYNC_CREATED_APP
    title: string
    description: string
    applicationsDate: string
    routingArr: Array<RoutingBasicItems>
}
export interface AsyncUpdateRouting{
    type: typeof ASYNC_UPDATE_ROUTING
    appId:string
    routingId:string
    point:LatLngExpression
    address:string
}

export type AppActions = LoadingMap & LoadingApp & SetApplications & SetCurrentApp