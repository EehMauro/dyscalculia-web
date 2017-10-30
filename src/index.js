import 'whatwg-fetch';
import 'typeface-roboto';
import 'rc-slider/assets/index.css';
import 'react-circular-progressbar/docs/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './bootstrap';
import { registerServiceWorker } from './utils';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
