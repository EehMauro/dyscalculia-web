import 'whatwg-fetch';
import 'typeface-open-sans';
import 'rc-slider/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './bootstrap';
import { registerServiceWorker } from './utils';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
