import React, {FC, memo, useRef, useState} from 'react';
import {Col, Layout, Row} from "antd";
import style from './MainComponent.module.scss'
import {Splitter} from "./components/Splitter";
import {MapComponent} from "../../pages/MapComponent/MapComponent";

const {Header, Content} = Layout;
const {HeaderBlock, ContentBlock,RowBlock} = style

export const MainComponent: FC = memo(() => {
    const [size,setSize] = useState({app:'30%',map:'69%'})
    const rowRef = useRef(null)
    return (
        <Layout>
            <Header className={HeaderBlock}>Header</Header>
            <Content className={ContentBlock}>
                <Row className={RowBlock} ref={rowRef} id={'RowBlcok'}>
                    <Col flex={size.app}>
                        application
                    </Col>
                    <Col flex={'1%'}>
                        <Splitter rowRef={rowRef} setSize={setSize}/>
                    </Col>
                    <Col flex={size.map}>
                        <MapComponent/>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
})