import {AppActions, AppInitialState} from "./app.model";

const prefix = "APP_DATA"

export const LOADING_MAP = `${prefix}/LOADING_MAP`
export const LOADING_APP = `${prefix}/LOADING_APP`
export const SET_APPLICATIONS = `${prefix}/SET_APPLICATIONS`
export const ASYNC_SET_APPLICATIONS = `${prefix}/ASYNC_SET_APPLICATIONS`
export const SET_CURRENT_APP = `${prefix}/SET_CURRENT_APP`
export const ASYNC_SET_CURRENT_APP = `${prefix}/ASYNC_SET_CURRENT_APP`
export const ASYNC_CREATED_APP = `${prefix}/ASYNC_CREATED_APP`
export const ASYNC_UPDATE_ROUTING = `${prefix}/ASYNC_UPDATE_ROUTING`

export const initialState: AppInitialState = {
    initialCoordinates: [55.7198, 37.6762],
    loadingMap: false,
    loadingApp: false,
    applications: [],
    currentApplication: undefined,
}

export const AppReducer = (state = initialState, action: AppActions): AppInitialState => {
    switch (action.type) {
        case SET_APPLICATIONS:
            return {
                ...state,
                loadingApp: false,
                applications: action.applications
            }
        case LOADING_MAP:
            return {
                ...state,
                loadingMap: action.loadingMap
            }
        case LOADING_APP:
            return {
                ...state,
                loadingApp: action.loadingApp
            }
        case SET_CURRENT_APP:
            return {
                ...state,
                loadingMap: false,
                currentApplication: action.applicationId ? {
                        currentId: action.applicationId,
                        currentRouting: state.applications.filter(app => app.id === action.applicationId)[0].routing

                    }
                    : undefined
            }
        default:
            return state
    }
}
