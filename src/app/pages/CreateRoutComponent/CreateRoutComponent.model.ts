import {Moment} from "moment";
export interface CreateRoutProps {
    setCreateRout: (createRout:boolean)=>void
}
export interface CreateRoutComponentForm {
    title: string
    description: string
    applicationsDate: Moment
    startPoint: string
    intermediatePoint: Array<{intermediatePoint:string}>
    endPoint: string
}