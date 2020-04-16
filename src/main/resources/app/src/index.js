import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import fontawesome from '@fortawesome/fontawesome';
import {faSpinner, faTrash} from '@fortawesome/free-solid-svg-icons';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './redux/reducers';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

fontawesome.library.add(faTrash, faSpinner)

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
