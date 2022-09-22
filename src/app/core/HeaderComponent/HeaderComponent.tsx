import React, {FC, memo} from 'react';
import {HeaderComponentProps} from "./HeaderComponent.model";
import {Button, Col, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import style from './HeaderComponent.module.scss'


const {HeaderBlock} = style
export const HeaderComponent: FC<HeaderComponentProps> = memo(({setCreateRout}) => {
    const createRoute = () => {
        setCreateRout(true)
    }
    return (
        <Header className={HeaderBlock}>
            <Row>
                <Col flex={'30%'}>
                    <Button
                        icon={<PlusOutlined/>}
                        onClick={createRoute}
                    >
                        Создать маршрут
                    </Button>
                </Col>
            </Row>
        </Header>
    );
})