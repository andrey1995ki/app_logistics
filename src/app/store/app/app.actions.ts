import {
    ApplicationsItem,
    AsyncCreatedApp,
    AsyncUpdateRouting,
    LoadingApp,
    LoadingMap,
    SetApplications,
    SetCurrentApp
} from "./app.model";
import {
    ASYNC_CREATED_APP,
    ASYNC_SET_APPLICATIONS,
    ASYNC_SET_CURRENT_APP,
    ASYNC_UPDATE_ROUTING,
    LOADING_APP,
    LOADING_MAP,
    SET_APPLICATIONS,
    SET_CURRENT_APP
} from "./app.reducer";
import {call, put, takeEvery} from 'redux-saga/effects'
import {ApplicationsApi} from "../../api/ApplicationsApi";
import {LatLngExpression} from "leaflet";
import {asyncSetApplications, asyncSetCurrentApp} from "./app.asyncActions";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export const toggleLoadingMap = (loadingMap: boolean): LoadingMap => ({
    type: LOADING_MAP,
    loadingMap
})
export const toggleLoadingApp = (loadingApp: boolean): LoadingApp => ({
    type: LOADING_APP,
    loadingApp
})
export const setApplications = (applications: Array<ApplicationsItem>): SetApplications => ({
    type: SET_APPLICATIONS,
    applications
})

export const setCurrentApp = (applicationId: string | undefined): SetCurrentApp => ({
    type: SET_CURRENT_APP,
    applicationId
})


export function* getApplication() {
    yield put(toggleLoadingApp(true))
    try {
        let {data} = yield call(ApplicationsApi.getApplications)
        yield put(setApplications(data))
    } catch (e) {
        yield put(toggleLoadingApp(false))
    }
}

export function* changeApp(payload: any) {
    yield put(toggleLoadingMap(true))
    //Задержка для перерисовки маршрута на карте карты
    yield delay(500)
    yield put(setCurrentApp(payload.appId))
}

export function* addRouting(id: string, point: LatLngExpression, description: string, address: string) {
    try {
        yield call(ApplicationsApi.addRouting, id, point
            , description
            , address)
    } catch (e) {
    }
}

export function* createdAppeal(payload: AsyncCreatedApp) {
    yield put(toggleLoadingMap(true))
    yield put(toggleLoadingApp(true))
    let id = undefined
    try {
        let {data} = yield call(ApplicationsApi.addApplications, payload.applicationsDate,
            payload.title,
            payload.description)
        for (let rout of payload.routingArr) {
            yield addRouting(data.id, rout.point, rout.description, rout.address)
        }
        id = data.id
    } catch (e) {
        yield put(toggleLoadingMap(false))
        yield put(toggleLoadingApp(false))
    }
    yield put(asyncSetApplications())
    yield put(asyncSetCurrentApp(id))
}

export function* updateRouting(payload: AsyncUpdateRouting) {
    yield put(toggleLoadingMap(true))
    yield put(toggleLoadingApp(true))
    try {
        yield call(ApplicationsApi.updateRouting, payload.appId, payload.routingId, payload.point, payload.address)
    } catch (e) {
        yield put(toggleLoadingMap(false))
        yield put(toggleLoadingApp(false))
    }
    yield put(asyncSetApplications())
    yield put(asyncSetCurrentApp(payload.appId))
}

export function* AppWatcher() {
    yield takeEvery(ASYNC_SET_CURRENT_APP, changeApp)
    yield takeEvery(ASYNC_SET_APPLICATIONS, getApplication)
    yield takeEvery(ASYNC_CREATED_APP, createdAppeal)
    yield takeEvery(ASYNC_UPDATE_ROUTING, updateRouting)
}