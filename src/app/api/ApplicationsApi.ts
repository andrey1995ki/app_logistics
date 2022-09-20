import axios from 'axios'
import {LatLngExpression} from "leaflet";

export const instance = axios.create({
    baseURL: 'https://632974774c626ff832c18f82.mockapi.io/'
})


export const ApplicationsApi = {
    getApplications(){
        return instance
            .get('applications')
    },
    addApplications(applicationsDate:string,
                    title:string,
                    description:string){
        return instance
            .post('applications',{
                applicationsDate,
                title,
                description
            })
    },
    addRouting(id:string,point:LatLngExpression, description:string,address:string){
        return instance
            .post(`applications/${id}/routing`,{
                point,
                description,
                address
            })
    },
    updateRouting(appId:string,routingId:string,point:LatLngExpression,address:string){
        return instance
            .put(`applications/${appId}/routing/${routingId}`,
                {
                    point,
                    address
                }
                )
    }
}