import L from "leaflet";
import {createControlComponent} from "@react-leaflet/core";
import "leaflet-routing-machine";
import {useSelector} from "react-redux";
import {AppSelector} from "../../store/app/app.selector";


const CreateRoutingLayer = () => {
    const {currentApplication} = useSelector(AppSelector)
    return L.Routing.control({
        waypoints: currentApplication?.currentRouting.map(point => L.latLng(point.point)),
        autoRoute: true,
        addWaypoints: true,
        fitSelectedRoutes: true,
        show: false,
        lineOptions: {
            extendToWaypoints: false,
            missingRouteTolerance: 0,
            styles: [{color: "#6FA1EC", weight: 4}]
        }
    })
}
export const RoutingLayer = createControlComponent(CreateRoutingLayer)

