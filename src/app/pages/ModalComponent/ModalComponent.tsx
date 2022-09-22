import React, {FC, memo} from 'react';
import {ModalComponentProps} from "./ModalComponent.model";
import {CreateRoutComponent} from "../CreateRoutComponent/CreateRoutComponent";
import {Modal} from "antd";

export const ModalComponent: FC<ModalComponentProps> = memo(({createRout, setCreateRout}) => {
    const createRoute = () => {
        setCreateRout(false)
    }
    return (
        <Modal
            title="Создание нового маршрута"
            open={createRout}
            onCancel={createRoute}
            footer={null}
            destroyOnClose
            bodyStyle={{padding: 0}}
            width={'40vw'}
        >
            <CreateRoutComponent setCreateRout={setCreateRout}/>
        </Modal>
    );
})