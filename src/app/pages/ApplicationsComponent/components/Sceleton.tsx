import {Divider, Skeleton} from "antd";
import React from "react";
import style from '../ApplicationsComponent.module.scss'

const {SceletonBlock, SceletonDivider} = style

export const Sceleton = () => {
    let arrSceleton = []
    for (let item = 0; item < 10; item++) {
        arrSceleton.push(
            <div key={item}>
                <Skeleton active paragraph={{rows: 1}} className={SceletonBlock}/>
                <Divider className={SceletonDivider}/>
            </div>
        )
    }
    return arrSceleton
}