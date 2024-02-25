import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import axios from 'axios';
window.axios= axios;


const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
    <App></App>
)
