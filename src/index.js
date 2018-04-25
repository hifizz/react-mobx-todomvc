import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import 'todomvc-app-css/index.css'
// import registerServiceWorker from '../registerServiceWorker';
import store from './app/store'

ReactDOM.render(<App appState={store}/>, document.getElementById('root'));
// registerServiceWorker();

