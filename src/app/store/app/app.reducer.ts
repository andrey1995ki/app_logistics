import {AppActions, AppInitialState} from "./app.model";

const prefix = "MAP_DATA"

export const LOADING_MAP = `${prefix}/LOADING_MAP`
export const SET_ROUTING = `${prefix}/SET_ROUTING`

export const initialState:AppInitialState = {
    initialCoordinates: [55.7198, 37.6762],
    loading: false,
    currentRouting: [
        {
            point: [55.7198, 37.6762],
            title: 'ТОчка старта',
            description: 'Начальная точка'
        },
        {
            point: [55.7198, 37.8763],
            title: 'Конечная точка',
            description: 'конечная'
        }
]
}

export const AppReducer = (state = initialState, action:AppActions): AppInitialState =>{
    switch (action.type){
        case SET_ROUTING:
            return {
                ...state,
                currentRouting: action.currentRouting
            }
        case LOADING_MAP:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state
    }
}
