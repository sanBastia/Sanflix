import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import Routes from './route';

render(
  // eslint-disable-next-line
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);
