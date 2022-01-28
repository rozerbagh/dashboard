import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import "./assets/css/style.css";
import "uplot/dist/uPlot.min.css";
import "rc-datetime-picker/dist/picker.css"
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme'
import App from './App';
import appStore from './store/store';

const app = (
    <Provider store={appStore}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
