import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css';
import {Provider} from "react-redux";
import {store} from "./app/store/store";
import {ConfigProvider} from "antd";
import ru from "antd/lib/locale-provider/ru_RU";
import {MainComponent} from "./app/core/MainComponent/MainComponent";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

function App() {
    return (
        <Provider store={store}>
            <ConfigProvider locale={ru}>
                <MainComponent/>
            </ConfigProvider>
        </Provider>
    );
}

export default App;
