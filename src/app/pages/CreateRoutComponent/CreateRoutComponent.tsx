import React, {FC, memo} from 'react';
import {AutoComplete, Button, Col, DatePicker, Form, Input, Row} from "antd";
import {RangePickerProps} from "antd/es/date-picker";
import moment from "moment";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {AsyncSetAddressList, setAddressList} from "../../store/address/address.actions";
import {AddressSelector} from "../../store/address/address.selector";
import {AddressList} from "../../store/address/address.model";
import {submitForm} from "./utils/SubmitForm";
import {CreateRoutProps} from "./CreateRoutComponent.model";

export const CreateRoutComponent: FC<CreateRoutProps> = memo(({setCreateRout}) => {
    const {addressList} = useSelector(AddressSelector)
    const dispatch = useDispatch()
    const disabledDate: RangePickerProps['disabledDate'] = current => {
        return current && current < moment().endOf('day');
    };
    const searchingAddress = (value: string) => {
        console.log(value);
        if (value.length >= 3) {
            dispatch(AsyncSetAddressList(value))
        }
    }
    const selectAddress = () => {
        dispatch(setAddressList(undefined))
    }
    const renderItem = (address: AddressList) => ({
        value: `${address.value}; ${address.data.geo_lat},${address.data.geo_lon}`,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {address.value}
            </div>
        ),
    });
    return (
        <div style={{padding: 10}}>
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
                    <DatePicker disabledDate={disabledDate} style={{width: '100%'}}/>
                </Form.Item>
                <Form.Item
                    label="Начальная точка"
                    name="startPoint"
                    rules={[{required: true, message: 'Введите дату выполнения маршрута'}]}
                >
                    <AutoComplete
                        options={addressList?.map(address => renderItem(address))}
                        onSearch={searchingAddress}
                        onSelect={selectAddress}
                    >
                    </AutoComplete>
                </Form.Item>
                <Form.List name="intermediatePoint">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Row key={key}>
                                    <Col flex={"auto"}>
                                        <Form.Item
                                            style={{width: '100%'}}
                                            noStyle
                                            shouldUpdate={(prevValues, curValues) =>
                                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                            }
                                        >
                                            {() => (
                                                <Form.Item
                                                    {...restField}
                                                    label={`Промежуточная точка ${key + 1}`}
                                                    name={[name, 'intermediatePoint']}
                                                    rules={[{
                                                        required: true,
                                                        message: `Введите промежуточную точку ${key + 1}`
                                                    }]}
                                                >
                                                    <AutoComplete
                                                        options={addressList?.map(address => renderItem(address))}
                                                        onSearch={searchingAddress}
                                                        onSelect={selectAddress}
                                                    >
                                                    </AutoComplete>
                                                </Form.Item>
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
                <Form.Item
                    label="Конечная точка"
                    name="endPoint"
                    rules={[{required: true, message: 'Введите дату выполнения маршрута'}]}
                >
                    <AutoComplete
                        options={addressList?.map(address => renderItem(address))}
                        onSearch={searchingAddress}
                        onSelect={selectAddress}
                    >
                    </AutoComplete>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Создать
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
})