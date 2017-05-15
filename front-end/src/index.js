import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducers from './reducers';

import Root from './components/Root';

// Global stylesheets
import './index.css';
import './styles/css/bootstrap.min.css';


const store = createStore(reducers);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
