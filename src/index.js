import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

localStorage.setItem("reservations", JSON.stringify([]));
localStorage.setItem("notifications", JSON.stringify([]));

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
