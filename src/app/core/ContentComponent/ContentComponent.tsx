import React, {FC, memo, useRef, useState} from 'react';
import {Col, Layout, Row} from "antd";
import {ApplicationsComponent} from "../../pages/ApplicationsComponent/ApplicationsComponent";
import {Splitter} from "./components/Splitter";
import {MapComponent} from "../../pages/MapComponent/MapComponent";
import style from "./ContentComponent.module.scss";

const {Content} = Layout;
const {ContentBlock, RowBlock, ColBlock} = style

export const ContentComponent: FC = memo(() => {
    const [size, setSize] = useState({app: '30%', map: '69%'})
    const rowRef = useRef(null)
    return (
        <Content className={ContentBlock}>
            <Row className={RowBlock} ref={rowRef}>
                <Col flex={size.app} className={ColBlock}>
                    <ApplicationsComponent/>
                </Col>
                <Col flex={'1%'}>
                    <Splitter rowRef={rowRef} setSize={setSize}/>
                </Col>
                <Col flex={size.map}>
                    <MapComponent/>
                </Col>
            </Row>
        </Content>
    );
})