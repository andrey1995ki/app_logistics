import {LOADING_MAP, SET_ROUTING} from "./app.reducer";
import {LatLngExpression} from "leaflet";

export interface AppInitialState {
    initialCoordinates: LatLngExpression
    loading: boolean
    currentRouting: Array<CurrentRoutingItems>| undefined
}
interface CurrentRoutingItems {
    point:LatLngExpression
    title: string
    description: string
}
export interface LoadingMap {
    type: typeof LOADING_MAP
    loading: boolean
}
export interface SetRouting {
    type: typeof SET_ROUTING
    currentRouting: Array<CurrentRoutingItems>
}
export type AppActions = LoadingMap & SetRouting