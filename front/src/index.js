import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import './style.css'; // Import the CSS file
// import {Provider} from 'react-redux';
// import {createStore, applyMiddleware} from 'redux';
// import {thunk} from 'redux-thunk';

import axios from 'axios';
window.axios= axios;


const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
    <App></App>
)
