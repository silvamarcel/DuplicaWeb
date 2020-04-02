import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import api from './api';
import './i18n/i18n';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
if (path) {
  history.replace(path);
}

render(<App api={api} />, document.getElementById('app'));
