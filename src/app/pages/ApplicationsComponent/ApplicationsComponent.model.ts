import {RoutingItems} from "../../store/app/app.model";

export interface ListItemProps {
    id: string
    title: string
    description: string
    currentId: string | undefined
    applicationsDate: string
    routing: Array<RoutingItems>
}

export interface ChangeAddressProps {
    updateRouting: (value: string) => void
    address: string
}

export type editableRouteState = { id: string, address: string } | null

export interface DefaultFieldProps {
    setEditableRoute: (value: editableRouteState) => void
    rout: RoutingItems
}
