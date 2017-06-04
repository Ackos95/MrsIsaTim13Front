import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import Root from './components/Root';

// Global stylesheets
import './index.css';
import './styles/css/bootstrap.min.css';

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    createLogger(), // neat middleware that logs actions
  )
);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
