import React, {FC, memo, useState} from 'react';
import {Layout} from "antd";
import {HeaderComponent} from "../HeaderComponent/HeaderComponent";
import style from './MainComponent.module.scss'
import {ContentComponent} from "../ContentComponent/ContentComponent";
import {ModalComponent} from "../../pages/ModalComponent/ModalComponent";

const {LayoutBlock} = style

export const MainComponent: FC = memo(() => {
    const [createRout, setCreateRout] = useState(false)
    return (
        <Layout className={LayoutBlock}>
            <HeaderComponent setCreateRout={setCreateRout}/>
            <ContentComponent/>
            <ModalComponent setCreateRout={setCreateRout} createRout={createRout}/>
        </Layout>
    );
})