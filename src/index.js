import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

import {history} from "./history";

import App from './App';
import state from './store';

import './styles/index.scss';

state.subscribe(() => console.log ("state: ", state.getState()))

ReactDOM.render (
  <Provider store={state}>
	<BrowserRouter history={history} basename={process.env.PUBLIC_URL} >
		<App/>
	</BrowserRouter>
  </Provider>,
  document.getElementById('root')
)