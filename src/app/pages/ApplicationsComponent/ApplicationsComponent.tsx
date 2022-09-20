import React, {FC, memo, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppSelector} from "../../store/app/app.selector";
import {Divider, List, Skeleton} from "antd";
import style from './ApplicationsComponent.module.scss'
import {ListItem} from "./components/ListItem";
import {asyncSetApplications} from "../../store/app/app.actions";

const {ApplicationBlock} = style

export const ApplicationsComponent: FC = memo(() => {
    const {loadingApp, applications, currentApplication} = useSelector(AppSelector)
    console.log(loadingApp)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncSetApplications())
    }, [dispatch])
    const sceleton = () => {
        let arrSceleton = []
        for (let item = 0; item < 5; item++) {
            arrSceleton.push(
                <div key={item}>
                    <Skeleton active paragraph={{rows: 1}} style={{padding: 12}}/>
                    <Divider style={{margin: 0}}/>
                </div>
            )
        }
        return arrSceleton
    }
    return (
        <div className={ApplicationBlock}>
            {
                !loadingApp && applications
                    ? <List
                        itemLayout="horizontal"
                        dataSource={applications}
                        renderItem={item => (
                            <ListItem description={item.description} id={item.id} title={item.title}
                                      currentId={currentApplication?.currentId} applicationsDate={item.applicationsDate}
                                      routing={item.routing}/>
                        )}
                    />
                    : sceleton()
            }
        </div>
    );
})