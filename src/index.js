import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'
import reportWebVitals from './reportWebVitals';

import { createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './store/reducers/auth';
import { Provider } from 'react-redux';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancer(
    applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)


ReactDOM.render(
  app, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();