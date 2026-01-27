import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {cardArray} from './data'
import {shuffle} from './data'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App cardArray={cardArray} shuffle={shuffle}/>
  </React.StrictMode>
);