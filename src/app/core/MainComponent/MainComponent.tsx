import React, {FC, memo, useRef, useState} from 'react';
import {Button, Col, Layout, Modal, Row} from "antd";
import style from './MainComponent.module.scss'
import {Splitter} from "./components/Splitter";
import {MapComponent} from "../../pages/MapComponent/MapComponent";
import {ApplicationsComponent} from "../../pages/ApplicationsComponent/ApplicationsComponent";
import {PlusOutlined} from "@ant-design/icons";
import {CreateRoutComponent} from "../../pages/CreateRoutComponent/CreateRoutComponent";

const {Header, Content} = Layout;
const {HeaderBlock, ContentBlock, RowBlock, ColBlock} = style

export const MainComponent: FC = memo(() => {
    const [size, setSize] = useState({app: '30%', map: '69%'})
    const [createRout, setCreateRout] = useState(false)
    const rowRef = useRef(null)
    return (
        <Layout>
            <Header className={HeaderBlock}>
                <Row>
                    <Col flex={'30%'}>
                        <Button icon={<PlusOutlined/>} onClick={() => setCreateRout(true)}>Создать
                            маршрут</Button>
                    </Col>
                </Row>
            </Header>
            <Content className={ContentBlock}>
                <Row className={RowBlock} ref={rowRef} id={'RowBlcok'}>
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
                <Modal
                    title="Создание нового маршрута"
                    open={createRout}
                    onCancel={() => setCreateRout(false)}
                    footer={null}
                    destroyOnClose
                    bodyStyle={{padding:0}}
                >
                    <CreateRoutComponent setCreateRout={setCreateRout}/>
                </Modal>
            </Content>
        </Layout>
    );
})