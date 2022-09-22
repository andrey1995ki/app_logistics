import {Moment} from "moment";
import {AddressList} from "../../store/address/address.model";

export interface CreateRoutProps {
    setCreateRout: (createRout: boolean) => void
}

export interface CreateRoutComponentForm {
    title: string
    description: string
    applicationsDate: Moment
    startPoint: string
    intermediatePoint: Array<{ intermediatePoint: string }>
    endPoint: string
}

export interface SearchAddressProps {
    addressList: undefined | Array<AddressList>
    label:string
    name:string | Array<any>
    message:string
}