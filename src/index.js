import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { GlobalStatePovider } from './state/store';

import { SnackbarProvider } from 'notistack';
import App from './App';
import * as serviceWorker from './serviceWorker';

import "bootstrap/dist/css/bootstrap.css";

import './index.css';
const hist = createBrowserHistory();

ReactDOM.render(
    <SnackbarProvider
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        hideIconVariant={false}
        autoHideDuration={5000}
        maxSnack={3}>
        <Router history={hist}>
            <GlobalStatePovider>
                <App />
            </GlobalStatePovider>
        </Router>

    </SnackbarProvider>,
    document.getElementById('root'));

serviceWorker.unregister();
