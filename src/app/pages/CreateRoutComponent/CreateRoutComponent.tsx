import React, {FC, memo} from 'react';
import {Button, Col, DatePicker, Form, Input, Row} from "antd";
import {RangePickerProps} from "antd/es/date-picker";
import moment from "moment";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {AddressSelector} from "../../store/address/address.selector";
import {submitForm} from "./utils/SubmitForm";
import {CreateRoutProps} from "./CreateRoutComponent.model";
import {SearchAddress} from "./components/SearchAddress";
import style from './CreateRoutComponent.module.scss'

const {FormItem, FormBlock} = style

export const CreateRoutComponent: FC<CreateRoutProps> = memo(({setCreateRout}) => {
    const {addressList} = useSelector(AddressSelector)
    const dispatch = useDispatch()
    const disabledDate: RangePickerProps['disabledDate'] = current => {
        return current && current < moment().endOf('day');
    };
    return (
        <div className={FormBlock}>
            <Form
                name="createRout"
                onFinish={(data) =>
                    submitForm(data, dispatch, setCreateRout)
                }
            >
                <Form.Item
                    label="Заявка"
                    name="title"
                    rules={[{required: true, message: 'Введите название заявки'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Описание"
                    name="description"
                    rules={[{required: true, message: 'Введите описание заявки'}]}
                >
                    <Input.TextArea autoSize showCount maxLength={100}/>
                </Form.Item>
                <Form.Item
                    label="Дата выполнения маршрута"
                    name="applicationsDate"
                    rules={[{required: true, message: 'Введите дату выполнения маршрута'}]}
                >
                    <DatePicker disabledDate={disabledDate} className={FormItem}/>
                </Form.Item>
                <SearchAddress addressList={addressList}
                               label={'Начальная точка'}
                               name={'startPoint'}
                               message={'Введите начальную точку маршрута'}/>
                <Form.List name="intermediatePoint">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Row key={key}>
                                    <Col flex={"auto"}>
                                        <Form.Item
                                            className={FormItem}
                                            noStyle
                                            shouldUpdate={(prevValues, curValues) =>
                                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                            }
                                        >
                                            {() => (
                                                <SearchAddress addressList={addressList}
                                                               label={'Промежуточная точка'}
                                                               name={[name, 'intermediatePoint']}
                                                               message={'Введите промежуточную точку'}/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col flex={"30px"}>
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(name)}
                                        />
                                    </Col>
                                </Row>
                            ))}
                            {
                                fields.length <= 3
                                &&
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                        Добавить промежуточную точку
                                    </Button>
                                </Form.Item>
                            }
                        </>
                    )}
                </Form.List>
                <SearchAddress addressList={addressList}
                               label={'Конечная точка'}
                               name={'endPoint'}
                               message={'Введите конечную точку маршрута'}/>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Создать
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
})