import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './components/App';
import {authService} from './fbase';

console.log(authService);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);