import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers'
import ReduxPromise from 'redux-promise';
import createSagaMiddleware from 'redux-saga'
import appSaga from './saga/AppSaga'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware, ReduxPromise))
);

sagaMiddleware.run(appSaga);

const appRoot = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <App {...(appRoot.dataset)}/>
    </Provider>,
    appRoot
);
