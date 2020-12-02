import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
const app = (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
