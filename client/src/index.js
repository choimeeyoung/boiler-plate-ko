import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

// Redux store는 Object 만 받기 때문에 Promise와 Function도 받아주기 위해서 
// redux-thunk 와 redux-promise를 사용하기 위해서 같이 생성
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
  // 01. <App /> 에 Redux의 연결 / redux의 Provider의 이용
  // 02. Provide 안에 store 넣어주기 / 
  <Provider store={createStoreWithMiddleware(
    Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&                  // 크롬의 
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )}
  >
    <App />
  </Provider> 
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

