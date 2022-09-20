import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token b32694c405da6948ccd58176686cc0fd47877261"
    }
})


export const AddressApi = {
    getAddress(address:string){
        return instance
            .post('suggest/address',{
                query: address
            })
    }
}