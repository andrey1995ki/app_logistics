import {RoutingItems} from "../../store/app/app.model";

export interface ListItemProps {
    id: string
    title: string
    description: string
    currentId: string | undefined
    applicationsDate:string
    routing:Array<RoutingItems>
}