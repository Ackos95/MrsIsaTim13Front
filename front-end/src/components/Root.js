import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import App from './App/App';
import Login from './Login/LoginAlex';

const NotFound = () => (
  <div>
    Page you are looking for doesn't exist, go to
    <Link to="/">Root path</Link>
  </div>
)

const Root = ({ store, history }) => (
  <Provider store={store}>
     <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/about" component={NotFound} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;