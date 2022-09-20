import React, {FC, memo} from 'react';
import style from '../MainComponent.module.scss'
import {SplitterProps} from "../MainComponent.model";

const {DividerBlock} = style

export const Splitter: FC<SplitterProps> = memo(({rowRef, setSize}) => {
    const changeSize = (event: React.MouseEvent<HTMLDivElement>) => {
        // @ts-ignore
        let windowSize = rowRef.current.offsetWidth
        const mouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
            let appSize = Math.floor(event.clientX * 100 / windowSize)
            let mapSize = 99 - appSize
            setSize({app: `${appSize}%`, map: `${mapSize}%`})
        }
        const removeEvent = () => {
            // @ts-ignore
            rowRef.current.removeEventListener("mousemove", mouseMove)
        }
        event.preventDefault()
        // @ts-ignore
        rowRef.current.addEventListener("mousemove", mouseMove)
        // @ts-ignore
        rowRef.current.addEventListener("mouseup", removeEvent)
    }
    return (
        <div className={DividerBlock} onMouseDown={changeSize}/>
    );
})