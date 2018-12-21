import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducersList from './modules'

const store=createStore(reducersList, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
