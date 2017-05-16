import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import App from './App/App';
import Login from './Login/LoginContainer';
import Signup from './Signup/Signup';
import Guest from './Guest/Guest';
import Manager from './Manager/Manager';
import SystemManager from './SystemManager/SystemManager';

const NotFound = () => (
  <div>
    Page you are looking for doesn't exist, go to 
    <Link to="/">Root path</Link>
  </div>
)

const Root = ({ store, history }) => (
  <Provider store={store}>
     <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/guest" component={Guest} />
        <Route path="/manager" component={Manager} />
        <Route path="/system-manager" component={SystemManager} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;