import React, {FC, memo, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppSelector} from "../../store/app/app.selector";
import {List} from "antd";
import style from './ApplicationsComponent.module.scss'
import {ListItem} from "./components/ListItem";
import {Sceleton} from "./components/Sceleton";
import {asyncSetApplications} from "../../store/app/app.asyncActions";

const {ApplicationBlock} = style

export const ApplicationsComponent: FC = memo(() => {
    const {loadingApp, applications, currentApplication} = useSelector(AppSelector)
    const sortApplications = applications
        .sort((itemA, itemB) => parseInt(itemB.id) - parseInt(itemA.id))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncSetApplications())
    }, [dispatch])
    return (
        <div className={ApplicationBlock}>
            {
                !loadingApp && applications
                    ? <List
                        itemLayout="horizontal"
                        dataSource={sortApplications}
                        renderItem={item => (
                            <ListItem description={item.description} id={item.id} title={item.title}
                                      currentId={currentApplication?.currentId} applicationsDate={item.applicationsDate}
                                      routing={item.routing}/>
                        )}
                    />
                    : Sceleton()
            }
        </div>
    );
})