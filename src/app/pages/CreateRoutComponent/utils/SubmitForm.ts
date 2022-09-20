import {CreateRoutComponentForm} from "../CreateRoutComponent.model";
import {Dispatch} from "redux";
import {asyncCreatedApp} from "../../../store/app/app.actions";
import {RoutingBasicItems} from "../../../store/app/app.model";
import {LatLngExpression} from "leaflet";

export const submitForm = ({
                                     title,
                                     description,
                                     applicationsDate,
                                     startPoint,
                                     intermediatePoint,
                                     endPoint
                                 }: CreateRoutComponentForm,
                                 dispatch: Dispatch,
                           setCreateRout:(createRout:boolean)=>void
                           ) => {
    const routingArr: Array<RoutingBasicItems> = [
        {
            description: 'Начальная точка',
            address: startPoint.split('; ')[0],
            point: startPoint.split('; ')[1].split(',').map(coor => parseFloat(coor)) as LatLngExpression
        }
    ]
    intermediatePoint?.forEach((point, index) =>
        routingArr.push({
            description: `Промежуточная точка ${index + 1}`,
            address: point.intermediatePoint.split('; ')[0],
            point: point.intermediatePoint.split('; ')[1].split(',').map(coor => parseFloat(coor)) as LatLngExpression
        })
    )
    routingArr.push({
        description: `Конечная точка`,
        address: endPoint.split('; ')[0],
        point: endPoint.split('; ')[1].split(',').map(coor => parseFloat(coor)) as LatLngExpression
    })
    dispatch(asyncCreatedApp(title, description, applicationsDate.format('YYYY-MM-DD HH:mm:ss'), routingArr))
    setCreateRout(false)
}