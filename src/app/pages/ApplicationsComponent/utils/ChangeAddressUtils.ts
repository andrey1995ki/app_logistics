import {Dispatch} from "redux";
import {asyncSetCurrentApp} from "../../../store/app/app.asyncActions";

export const selectedItems = (id: string, currentId: string | undefined, dispatch: Dispatch) => {
    if (id === currentId) {
        dispatch(asyncSetCurrentApp(undefined))
    } else {
        dispatch(asyncSetCurrentApp(id))
    }
}
